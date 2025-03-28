import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface SurveyQuestion {
  text: string;
  type: 'multiple choice' | 'rating' | 'open-ended';
  options?: string[];
}

export const generateSurvey = async (researchQuestion: string): Promise<SurveyQuestion[]> => {
  try {
    const response = await axios.post(`${API_URL}/generate-survey`, { researchQuestion });
    return response.data;
  } catch (error) {
    console.error('Survey generation failed', error);
    throw error;
  }
};