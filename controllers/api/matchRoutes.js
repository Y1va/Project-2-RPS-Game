// const router = require('express').Router();
// const { Match } = require('../../models');

// // Route to play match
// router.post('/', async (req, res) => {
//   try {
//     const { userId, gamesPlayed, wins, losses } = req.body;

//     // Record match result to the database
//     const match = await Match.create({ userId, gamesPlayed, wins, losses });

//     // Send back the newly created match object to the client
//     res.json(match);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to get all matches for a specific user
// router.get('/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Find all matches for the specified user
//     const matches = await Match.findAll({ where: { userId } });

//     res.json(matches);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
