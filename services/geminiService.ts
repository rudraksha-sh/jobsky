import { GoogleGenAI, Type } from "@google/genai";
import type { CareerAdvisorResponse, Language } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    skills_detected: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of skills detected from resume and user input."
    },
    career_suggestions: {
      type: Type.ARRAY,
      description: "A list of 2-3 detailed career suggestions.",
      items: {
        type: Type.OBJECT,
        properties: {
          career: {
            type: Type.STRING,
            description: "The name of the career path."
          },
          matched_skills: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Skills the user already has for this career."
          },
          missing_skills: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Critical skills the user needs to learn for this career."
          },
          roadmap: {
            type: Type.ARRAY,
            description: "A 3-4 step plan to acquire the missing skills.",
            items: {
              type: Type.OBJECT,
              properties: {
                step: {
                  type: Type.STRING,
                  description: "A clear, actionable step."
                },
                resources: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "A list of free/affordable online resources (e.g., YouTube, Coursera links) for this step."
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
      description: "General, actionable advice like building projects or contributing to open-source."
    },
    language_used: {
      type: Type.STRING,
      description: "The language used in the response, either 'english' or 'hindi'."
    }
  },
  required: ["skills_detected", "career_suggestions", "extra_recommendations", "language_used"]
};

const systemInstruction = `You are JOBSKY, a world-class AI Career & Skills Advisor. Your goal is to help users discover personalized career paths based on their skills, resume, and goals.

You MUST follow these instructions precisely:
1.  Analyze the provided resume text, LinkedIn profile info, and skills list.
2.  Identify 2-3 realistic career paths based on current industry demand.
3.  For each career, create a detailed, step-by-step roadmap.
4.  The roadmap must include missing skills, recommended courses, and potential projects.
5.  Include links to free or affordable learning resources (e.g., YouTube, Coursera, official docs, Kaggle).
6.  If the user requests 'hindi', provide career names and roadmap steps in Hindi, but keep resource links and technical terms (like 'Python', 'Docker') in English.
7.  Your response MUST be a single, valid JSON object that strictly adheres to the provided schema. Do not add any text, explanations, or markdown formatting before or after the JSON object.
8.  Be concise, professional, and actionable. Avoid generic motivational text.
`;


export const generateCareerAdvice = async (
  resumeText: string,
  skills: string[],
  language: Language
): Promise<CareerAdvisorResponse> => {
  // A future implementation could also take a LinkedIn URL and use a backend service to scrape and add it to the prompt.
  const prompt = `
    Analyze the following information and generate career advice.

    - Resume Text: """${resumeText}"""
    - Additional Skills: ${skills.join(', ')}
    - Requested Language: ${language}

    Generate the response in the specified language and follow all system instructions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as CareerAdvisorResponse;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate career advice from Gemini API.");
  }
};