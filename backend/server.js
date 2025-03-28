import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  // Catch-all route to serve the frontend
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// Improved Survey Generation Function
async function generateSurveyQuestions(researchQuestion) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a professional survey with 5-7 structured questions about: ${researchQuestion}. 
    Provide output in this strict JSON format:
    [
      {
        "id": "q1",
        "text": "Question text here",
        "type": "multiple_choice|rating|open_ended",
        "options": ["Option1", "Option2"] // Only if type is multiple_choice
      }
    ]`;

    const result = await model.generateContent(prompt);
    const surveyQuestions = JSON.parse(result.response.text());
    return surveyQuestions;
  } catch (error) {
    console.error('Survey generation error:', error);
    throw new Error('Failed to generate survey');
  }
}

// Survey Generation Route
app.post('/api/generate-survey', async (req, res) => {
  try {
    const { researchQuestion } = req.body;
    
    if (!researchQuestion) {
      return res.status(400).json({ error: 'Research question is required' });
    }

    const survey = await generateSurveyQuestions(researchQuestion);
    res.json(survey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
