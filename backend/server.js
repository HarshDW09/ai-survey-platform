import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Gemini AI Survey Generation
async function generateSurveyQuestions(researchQuestion) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Generate a professional survey with 5-7 structured questions about: ${researchQuestion}. 
    Format the output as a JSON array with each question having:
    - text: question text
    - type: multiple choice, rating, or open-ended
    - options: (if applicable)`;
    
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error('Survey generation error:', error);
    throw new Error('Failed to generate survey');
  }
}

// Survey Generation Route
app.post('/api/generate-survey', async (req, res) => {
  try {
    const { researchQuestion } = req.body;
    const survey = await generateSurveyQuestions(researchQuestion);
    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});