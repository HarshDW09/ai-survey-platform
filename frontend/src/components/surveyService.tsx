import React, { useState } from 'react';
import { generateSurvey, SurveyQuestion } from '../services/surveyService';

const SurveyGenerator: React.FC = () => {
  const [researchQuestion, setResearchQuestion] = useState('');
  const [survey, setSurvey] = useState<SurveyQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateSurvey = async () => {
    setLoading(true);
    try {
      const generatedSurvey = await generateSurvey(researchQuestion);
      setSurvey(generatedSurvey);
    } catch (error) {
      console.error('Survey generation error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Survey Generator</h1>
      <input 
        type="text"
        value={researchQuestion}
        onChange={(e) => setResearchQuestion(e.target.value)}
        placeholder="Enter your research question"
      />
      <button onClick={handleGenerateSurvey} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Survey'}
      </button>

      {survey.length > 0 && (
        <div>
          <h2>Generated Survey</h2>
          {survey.map((question, index) => (
            <div key={index}>
              <p>{question.text}</p>
              <p>Type: {question.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyGenerator;