import { GoogleGenAI, Type } from "@google/genai";
import type { CareerAdvisorResponse } from '../types';

// FIX: Initialize the GoogleGenAI client as per the guidelines.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable is not set");
}
const ai = new GoogleGenAI({ apiKey });

// FIX: Define the response schema to ensure structured JSON output from the Gemini API.
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        skills_detected: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of skills detected from the user's input."
        },
        career_suggestions: {
            type: Type.ARRAY,
            description: "A list of 2-3 career suggestions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    career: { type: Type.STRING, description: "The name of the career path." },
                    matched_skills: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "List of the user's skills that match this career."
                    },
                    missing_skills: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "List of skills the user needs to learn for this career."
                    },
                    roadmap: {
                        type: Type.ARRAY,
                        description: "A step-by-step plan to achieve this career.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                step: { type: Type.STRING, description: "A summary of the roadmap step." },
                                resources: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                    description: "A list of 2-3 specific, actionable resources for this step (e.g., online courses, books, projects)."
                                }
                            },
                            required: ["step", "resources"]
                        }
                    }
                },
                required: ["career", "matched_skills", "missing_skills", "roadmap"]
            }
        },
        extra_recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "General career advice or other recommendations."
        },
        language_used: {
            type: Type.STRING,
            enum: ['english', 'hindi'],
            description: "The language detected in the user's prompt ('english' or 'hindi')."
        }
    },
    required: ["skills_detected", "career_suggestions", "extra_recommendations", "language_used"]
};

// FIX: Implement the function to call the Gemini API for career advice.
export const getCareerAdvice = async (userInput: string): Promise<CareerAdvisorResponse> => {
    
    const systemInstruction = `You are "Jobsky", an expert AI career advisor. Your goal is to provide personalized, actionable career guidance based on the user's skills, interests, and background.

    Follow these instructions carefully:
    1.  **Analyze Input:** Carefully parse the user's input to identify their current skills, experience, and career interests.
    2.  **Detect Skills:** List the key skills you've identified under 'skills_detected'.
    3.  **Suggest Careers:** Provide 2-3 relevant and specific career suggestions. For each suggestion:
        -   Clearly state the career title.
        -   List which of the user's skills are a good match ('matched_skills').
        -   Identify crucial skills they are missing ('missing_skills').
        -   Create a practical, step-by-step 'roadmap' with 3-5 steps.
        -   For each roadmap step, provide 2-3 specific, high-quality learning resources (e.g., "Complete the 'Google Data Analytics Professional Certificate' on Coursera," "Read 'Designing Data-Intensive Applications' by Martin Kleppmann," "Build a portfolio project analyzing a public dataset from Kaggle"). Avoid generic advice.
    4.  **Extra Recommendations:** Offer 1-2 additional, insightful recommendations. This could be about networking, portfolio building, or emerging trends.
    5.  **Language Detection:** Identify if the user's prompt is primarily in 'english' or 'hindi' and set the 'language_used' field accordingly.
    6.  **JSON Output:** You MUST respond with ONLY a valid JSON object that strictly adheres to the provided schema. Do not include any introductory text, markdown formatting (like \`\`\`json), or explanations outside of the JSON structure.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userInput,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.5,
            }
        });

        const jsonText = response.text;
        
        if (!jsonText) {
            throw new Error("API returned an empty response.");
        }

        const parsedResponse = JSON.parse(jsonText) as CareerAdvisorResponse;
        return parsedResponse;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to get career advice: ${error.message}`);
        }
        throw new Error("An unknown error occurred while fetching career advice.");
    }
};
