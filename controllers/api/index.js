const router = require('express').Router();

const userRoutes = require('./UserRoutes')
const communityForumRoutes = require('./comForumRoutes');
// const leaderboardRoutes = require('./leaderboardRoutes');
// const matchRoutes = require('./matchRoutes');

// Define the routes
router.use('/users', userRoutes)
router.use('/communityforum', communityForumRoutes);
// router.use('/leaderboard', leaderboardRoutes);
// router.use('/match', matchRoutes);

module.exports = router;