import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default async function sendMail({ to, subject, text }) {
  return transporter.sendMail({
    from: "Ticket System <noreply@example.com>",
    to,
    subject,
    text,
  });
}
