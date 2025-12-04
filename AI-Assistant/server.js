import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import ticketRoutes from "./routes/ticket.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-create.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server at http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ Startup error: ", err));

  app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onTicketCreated],
  })
);