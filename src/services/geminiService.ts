import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getTutorResponse = async (message: string, history: { role: string, text: string }[]) => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
      { role: "user", parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: "You are an expert tutor for the Claude Certified Architect exam. Your goal is to help students understand complex AI architecture concepts, prompt engineering, and system design using Claude. Be concise, professional, and encouraging. Use Markdown for formatting. Always respond in Japanese (日本語) as the primary language for this student.",
    }
  });

  const response = await model;
  return response.text;
};
