import { UserDetails } from '@/types';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

export async function generateFitnessPlan(userDetails: UserDetails) {
  const prompt = `
You are an expert AI fitness coach. Generate a comprehensive, personalized fitness plan based on the following user details:

Name: ${userDetails.name}
Age: ${userDetails.age}
Gender: ${userDetails.gender}
Height: ${userDetails.height} cm
Weight: ${userDetails.weight} kg
Fitness Goal: ${userDetails.fitnessGoal}
Fitness Level: ${userDetails.fitnessLevel}
Workout Location: ${userDetails.workoutLocation}
Dietary Preference: ${userDetails.dietaryPreference}
${userDetails.medicalHistory ? `Medical History: ${userDetails.medicalHistory}` : ''}
${userDetails.stressLevel ? `Stress Level: ${userDetails.stressLevel}` : ''}

Please provide a detailed response in the following JSON format:
{
  "workoutPlan": [
    {
      "day": "Monday",
      "exercises": [
        {
          "name": "Exercise name",
          "sets": 3,
          "reps": "10-12",
          "restTime": "60 seconds",
          "notes": "Any specific tips"
        }
      ]
    }
  ],
  "dietPlan": {
    "breakfast": {
      "name": "Breakfast name",
      "items": ["Item 1", "Item 2"],
      "calories": "400 kcal",
      "protein": "25g"
    },
    "lunch": {
      "name": "Lunch name",
      "items": ["Item 1", "Item 2"],
      "calories": "600 kcal",
      "protein": "40g"
    },
    "dinner": {
      "name": "Dinner name",
      "items": ["Item 1", "Item 2"],
      "calories": "500 kcal",
      "protein": "35g"
    },
    "snacks": {
      "name": "Snacks",
      "items": ["Snack 1", "Snack 2"],
      "calories": "200 kcal",
      "protein": "10g"
    }
  },
  "tips": [
    "Lifestyle tip 1",
    "Posture tip 2",
    "General tip 3"
  ],
  "motivation": "A powerful motivational message"
}

Generate a 7-day workout plan. Make sure the diet aligns with their dietary preference (${userDetails.dietaryPreference}). Be specific and practical.
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  
  // Extract JSON from markdown code blocks if present
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
  const jsonText = jsonMatch ? jsonMatch[1] : text;
  
  return JSON.parse(jsonText.trim());
}

export async function generateMotivationQuote() {
  const prompt = 'Generate a short, powerful motivational fitness quote (maximum 20 words). Just return the quote, nothing else.';
  
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text().trim().replace(/['"]/g, '');
}

export async function generateImage(prompt: string) {
  // Using Gemini's imagen model for image generation
  const imageModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const fullPrompt = `Generate a detailed description for creating an image of: ${prompt}. 
  Make it realistic, high-quality, and fitness/food photography style. 
  Maximum 100 words, focus on visual details.`;
  
  const result = await imageModel.generateContent(fullPrompt);
  const description = result.response.text();
  
  // Return description that can be used with image generation APIs
  return {
    description,
    searchTerm: prompt
  };
}