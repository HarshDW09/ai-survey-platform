// src/SurveyForm.jsx
import React, { useState } from 'react';

const SurveyForm = () => {
  const [researchQuestion, setResearchQuestion] = useState('');
  const [survey, setSurvey] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure your backend URL is correct (use VITE_BACKEND_URL for Vercel or your Render URL)
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
