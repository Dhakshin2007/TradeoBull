
import { GoogleGenAI } from "@google/genai";
import { Stock } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketSentiment = async (stocks: Stock[]): Promise<string> => {
  try {
    const marketSummary = stocks.slice(0, 5).map(s => `${s.symbol}: ₹${s.price} (${s.changePercent}%)`).join(', ');
    const prompt = `
      You are a senior financial analyst for the Indian Stock Market.
      Based on this market snapshot: ${marketSummary}.
      Provide a 2-sentence summary of the current market sentiment (Bullish/Bearish/Neutral) and a quick tip for a beginner investor.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Market is volatile. Trade with caution.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to fetch market sentiment.";
  }
};

export const getStockAnalysis = async (stock: Stock): Promise<string> => {
  try {
    const prompt = `
      Analyze the stock ${stock.name} (${stock.symbol}) currently trading at ₹${stock.price}.
      The sector is ${stock.sector}.
      Provide a brief, beginner-friendly analysis (max 50 words) on what factors usually drive this stock's price in the Indian market.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not retrieve analysis.";
  }
};

export const getChatResponse = async (userMessage: string): Promise<string> => {
    try {
        const prompt = `
            You are 'Genius', a friendly and helpful trading mentor for beginners on the 'TradeoBull' app.
            The user asks: "${userMessage}".
            Provide a short, simple answer (max 3 sentences). 
            Avoid complex financial jargon. If asked about specific Buy/Sell advice, say you are a simulator AI and cannot give financial advice.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "I didn't quite catch that.";
    } catch (error) {
        return "Sorry, I'm having trouble thinking right now.";
    }
};
