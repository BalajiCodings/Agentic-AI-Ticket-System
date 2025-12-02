import { Inngest } from "inngest";

// Initialize Inngest client for sending events from the application.
// Only used for sending client-side events (server -> Inngest).
const inngest = new Inngest({
  name: "AgenticAI Ticket System",
  clientKey: process.env.INNGEST_API_KEY,
  region: process.env.INNGEST_REGION || undefined,
});

export async function sendEvent(name, data = {}) {
  if (!process.env.INNGEST_API_KEY) {
    // Silently skip during local development if key isn't set.
    console.warn("INNGEST_API_KEY not set — skipping event send:", name);
    return;
  }

  try {
    await inngest.send({ name, data });
  } catch (err) {
    console.error("Failed to send Inngest event", err);
  }
}

export default inngest;
