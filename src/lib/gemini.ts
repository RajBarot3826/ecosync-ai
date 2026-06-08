import { GoogleGenerativeAI } from "@google/generative-ai";

// Use an environment variable, but fallback to a placeholder if not set for demo purposes
// In a real app, NEVER expose your API key to the client. This should be a backend call.
// For the hackathon MVP frontend-only demo, this is acceptable.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE";

const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
};

export const generateSustainabilityTip = async (context: string) => {
  if (API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
    return "Please configure your VITE_GEMINI_API_KEY in the .env file to see real AI suggestions. For now: Try taking the bus tomorrow to reduce your transport footprint by 40%!";
  }

  try {
    const model = getGeminiModel();
    const prompt = `You are the EcoSync AI Sustainability Coach. Based on this user context: "${context}", give a short, encouraging 2-sentence tip on how to reduce their carbon footprint.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Hmm, I'm having trouble connecting to my neural network. Remember to turn off the lights when you leave the room!";
  }
};
