import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default async function analyzeTicket(title, description) {
  const prompt = `
  Analyze the following ticket and return JSON:
  Title: ${title}
  Description: ${description}

  Return:
  {
    "priority": "low | medium | high",
    "skills": ["skill1", "skill2"],
    "notes": "short helpful notes",
    "type": "category of issue"
  }
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return JSON.parse(text);
}
