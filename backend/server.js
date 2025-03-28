const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('AI Survey Platform Backend');
});

// Survey generation route (placeholder)
app.post('/generate-survey', async (req, res) => {
  try {
    const { researchQuestion } = req.body;
    res.json({ message: `Survey generation for: ${researchQuestion}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  ccdonsole.log(`Server running on port ${PORT}`);
});