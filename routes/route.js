const express = require('express');
const axios = require('axios');
const router = express.Router();

const generateMCQQuestions = async (topic) => {
  const prompt = `Generate 5 multiple-choice questions on the topic "${topic}". Each question should have a question and their  4 options ,like first question then option of that question option should come in form of  array .  Format the response as follows:

  Question ?
  A) Option 1
  B) Option 2
  C) Option 3
  D) Option 4
  `;

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: prompt }
    ]
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.data.choices && response.data.choices[0].message) {
    return response.data.choices[0].message.content;
  } else {
    throw new Error('Failed to generate response!');
  }
};

router.post('/post/question', async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).send('Topic is required');
  }

  try {
    const questions = await generateMCQQuestions(topic);
    res.json({ questions });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
