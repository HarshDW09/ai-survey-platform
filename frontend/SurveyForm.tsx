/// <reference types="vite/client" />
import React, { useState } from 'react';

interface Survey {
  id: string;
  text: string;
  type: string;
  options?: string[];  // Optional because only multiple_choice has options
}

const SurveyForm = () => {
  const [researchQuestion, setResearchQuestion] = useState<string>('');
  const [survey, setSurvey] = useState<Survey[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure the backend URL is correctly set (use VITE_BACKEND_URL for Vercel or Render URL)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-survey`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ researchQuestion }),
    });

    const data = await response.json();
    setSurvey(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={researchQuestion}
          onChange={(e) => setResearchQuestion(e.target.value)}
          placeholder="Enter your research question"
        />
        <button type="submit">Generate Survey</button>
      </form>

      {survey && (
        <div>
          <h3>Survey Questions</h3>
          <pre>{JSON.stringify(survey, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
