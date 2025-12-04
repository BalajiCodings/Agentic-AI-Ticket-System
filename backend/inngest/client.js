
import { Inngest } from "inngest";
const INNGEST_API_KEY = process.env.INNGEST_API_KEY || ""; // set in .env for prod/staging
export const inngest = new Inngest({
  name: "ai-ticket-assistant",
  apiKey: INNGEST_API_KEY,
});
