const express = require('express');
const axios = require('axios');
const router = express.Router();

const generateMCQQuestions = async (topic) => {
  const prompt = `You are given with a topic and you have to generate 15 questions with their multiple choice options. the topic is  "${topic}". You have to follow the response format like this

  [
    {
      "Question": "first question",
      "Options": ["Option1", "Option2", "Option3", "Option4"]
    },
    {
      "Question": "Second question",
      "Options": ["Option1", "Option2", "Option3", "Option4"]
    },
    {
      "Question": "Third question",
      "Options": ["Option1", "Option2", "Option3", "Option4"]
    }
  ]

  Dont include anything else in your response except the questions, Response should be as such that i can use it with .map function of javascript.
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
    res.send( questions );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
