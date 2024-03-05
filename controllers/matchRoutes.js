const express = require('express');
const router = express.Router();
const Match = require('../models/match'); // Create Match model

// Route to play match
router.post('/play', async (req, res) => {
  try {
    const { user, choice } = req.body;

    const computerChoice = Math.floor(Math.random() * 3); // 0 = rock 1 = paper 2 = scissors
    // Calculate the game result
    const result = calculateResult(choice, computerChoice);

    // Record match result to the database
    await Match.create({ result });
    res.json({ result, computerChoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to calculate game result
function calculateResult(userChoice, computerChoice) {
  if (
    (userChoice === 0 && computerChoice === 2) ||
    (userChoice === 1 && computerChoice === 0) ||
    (userChoice === 2 && computerChoice === 1)
  ) {
    return 'win';
  } else if (userChoice === computerChoice) {
    return 'tie';
  } else {
    return 'loss';
  }
}


// Route to get all matches