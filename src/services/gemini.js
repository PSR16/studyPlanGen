import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
const MODEL_NAME = "gemini-1.0-pro";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

const generationConfig = {
    maxOutputTokens: 1000000,
    temperature: 0.4,
    topP: 0.1,
    topK: 16,
  };

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,	threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
  ];

const callGeminiAPI = async (prompt) => {
  try {

    const model = genAI.getGenerativeModel({ model: MODEL_NAME, generationConfig, safetySettings});
    const result = await model.generateContent(prompt);
    const response = await result.response;

    console.log(response)
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error:', error);
    return 'Error generating text';
  }
};

export { callGeminiAPI };