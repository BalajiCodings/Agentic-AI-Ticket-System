import Ticket from "../models/ticket.js";
import { sendEvent } from "../inngest/client.js";

// Create a new ticket and emit `ticket.created` event to Inngest.
export const createTicket = async (req, res) => {
  try {
    const { title, description, relatedSkills, priority, deadline } = req.body;

    const ticket = new Ticket({
      title,
      description,
      relatedSkills: relatedSkills || [],
      priority: priority || "medium",
      deadline: deadline || null,
      createdBy: req.user ? req.user.id : null,
    });

    const saved = await ticket.save();

    // Fire-and-forget: notify Inngest about the new ticket.
    // We don't await here to avoid slowing the HTTP response.
    sendEvent("ticket.created", { ticket: saved }).catch(() => {});

    return res.status(201).json(saved);
  } catch (error) {
    console.error("createTicket error:", error);
    return res.status(500).json({ error: "Unable to create ticket" });
  }
};

export const getTickets = async (req, res) => {
  try {
    // Return tickets created by the logged-in user.
    const userId = req.user ? req.user.id : null;
    const tickets = await Ticket.find({ createdBy: userId }).sort({ createdAt: -1 });
    return res.json(tickets);
  } catch (error) {
    console.error("getTickets error:", error);
    return res.status(500).json({ error: "Unable to get tickets" });
  }
};

export const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    // Simple ownership check: only creator may fetch (adjust for roles later)
    if (req.user && String(ticket.createdBy) !== String(req.user.id)) {
      return res.status(403).json({ error: "Access denied" });
    }

    return res.json(ticket);
  } catch (error) {
    console.error("getTicket error:", error);
    return res.status(500).json({ error: "Unable to get ticket" });
  }
};
