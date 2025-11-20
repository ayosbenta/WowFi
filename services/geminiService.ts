import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Write a compelling, short marketing description (max 2 sentences) for an e-commerce product. 
    Product Name: ${productName}
    Category: ${category}
    
    Tone: Professional yet exciting.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating description. Please try again.";
  }
};

export const chatWithAI = async (message: string, context?: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are a helpful shopping assistant for DITO Home Wifi. 
    Help users find products, answer questions about shipping (we ship worldwide), and return policies (30 days).
    Keep answers concise and friendly.
    ${context ? `Current page context: ${context}` : ''}`;

    const response = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction
      }
    });

    return response.text || "I'm having trouble thinking right now.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I am currently offline.";
  }
};