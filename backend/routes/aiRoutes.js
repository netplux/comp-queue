// backend/routes/aiRoutes.js

const express = require('express');
const router = express.Router();
const { generateAIContent } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// Route to generate AI content based on a prompt
router.post('/generate', protect, async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await generateAIContent(prompt);
    res.status(200).json({ content: aiResponse });
  } catch (err) {
    console.error('AI Generation Error:', err);
    res.status(500).json({ error: 'Failed to generate AI content' });
  }
});

module.exports = router;
