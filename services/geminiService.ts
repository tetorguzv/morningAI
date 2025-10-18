
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    overallSummary: {
      type: Type.STRING,
      description: "A brief, positive, and encouraging overall summary of the morning look, starting with a friendly greeting."
    },
    swelling: {
      type: Type.OBJECT,
      properties: {
        observation: { type: Type.STRING, description: "Gentle observation about any visible puffiness or swelling." },
        tips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-3 actionable tips to reduce swelling." }
      },
      required: ['observation', 'tips']
    },
    skin: {
      type: Type.OBJECT,
      properties: {
        observation: { type: Type.STRING, description: "Gentle observation about skin condition (e.g., redness, dryness, blemishes)." },
        tips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-3 actionable tips for morning skin care." }
      },
      required: ['observation', 'tips']
    },
    fatigue: {
      type: Type.OBJECT,
      properties: {
        observation: { type: Type.STRING, description: "Gentle observation about signs of tiredness (e.g., dark circles)." },
        tips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-3 actionable tips to feel more refreshed." }
      },
      required: ['observation', 'tips']
    },
    stress: {
      type: Type.OBJECT,
      properties: {
        observation: { type: Type.STRING, description: "Gentle observation about signs of tension or stress in the face." },
        tips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-3 actionable tips for morning stress relief." }
      },
      required: ['observation', 'tips']
    }
  },
  required: ['overallSummary', 'swelling', 'skin', 'fatigue', 'stress']
};


export const getFaceAnalysis = async (imageBase64: string): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-2.5-flash";

  const prompt = "You are a friendly and professional AI wellness assistant called 'Morning Radiance'. Analyze the provided photo of a person's face taken in the morning. Based only on visible cues in the image, identify signs related to four categories: Swelling (e.g., puffiness around eyes), Skin Condition (e.g., redness, dryness, blemishes), Fatigue (e.g., dark circles, tired eyes), and Stress (e.g., tense facial muscles, frown lines). For each category, provide a gentle, non-alarming observation and 2-3 simple, actionable wellness tips. Also provide a positive and encouraging overall summary. Your response must be in JSON format according to the provided schema. Do not provide any medical diagnosis or advice. Frame all suggestions as general wellness tips.";

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: imageBase64.split(',')[1],
    },
  };
  
  const textPart = {
    text: prompt
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.3,
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AnalysisResult;
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI. The model may be unable to process the request.");
  }
};
