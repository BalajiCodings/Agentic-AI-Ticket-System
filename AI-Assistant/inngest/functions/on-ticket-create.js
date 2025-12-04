import { inngest } from "../client.js";
import Ticket from "../../models/ticket.js";
import User from "../../models/user.js";
import sendMail from "../../utils/mail.js";
import analyzeTicket from "../../utils/gemini.js";

export const onTicketCreated = inngest.createFunction(
  { id: "process-ticket-ai" },
  { event: "ticket/created" },
  async ({ event, step }) => {
    const { ticketId, title, description, createdBy } = event.data;

    // Step 1: AI analysis of the ticket
    const analysis = await step.run("ai-analyze-ticket", async () => {
      return await analyzeTicket(title, description);
    });

    // Step 2: Update ticket with AI results
    const updatedTicket = await step.run("update-ticket", async () => {
      return await Ticket.findByIdAndUpdate(
        ticketId,
        {
          priority: analysis.priority,
          relatedSkills: analysis.skills,
          helpfulNotes: analysis.notes,
          ticketType: analysis.type,
        },
        { new: true }
      );
    });

    // Step 3: Find moderator matching skills
    const moderator = await step.run("match-moderator", async () => {
      return await User.findOne({
        role: "moderator",
        skills: { $regex: analysis.skills.join("|"), $options: "i" },
      });
    });

    // Step 4: Assign moderator or fallback to admin
    const assigned = await step.run("assign-ticket", async () => {
      const best = moderator || (await User.findOne({ role: "admin" }));

      updatedTicket.assignedTo = best._id;
      await updatedTicket.save();

      return best;
    });

    // Step 5: Email notification
    await step.run("send-email", async () => {
      await sendMail({
        to: assigned.email,
        subject: "New Ticket Assigned",
        text: `A new ticket has been assigned to you.\n\nTitle: ${title}\nPriority: ${analysis.priority}\nNotes: ${analysis.notes}`
      });
    });

    return { message: "Ticket processed successfully" };
  }
);
