// const router = require('express').Router();
// const { User, Profile, LeaderboardEntry } = require('../../models');

// // Get leaderboard data
// router.get('/leaderboard', async (req, res) => {
//     try {
//         // Retrieve leaderboard entries with associated profile and user data
//         const leaderboardEntries = await LeaderboardEntry.findAll({
//             include: [
//                 {
//                     model: Profile,
//                     include: [
//                         {
//                             model: User // Include the User model to access the name attribute
//                         }
//                     ]
//                 }
//             ],
//             order: [[Profile, 'wins', 'DESC']] // Order by wins from the Profile model
//         });

//     // Map the leaderboard entries to the desired format
//     const formattedLeaderboardEntries = leaderboardEntries.map((entry, index) => ({
//         rank: index + 1,
//         userId: entry.Profile.userId,
//         name: entry.Profile.User.name, // Accessing the name attribute from the associated User model
//         wins: entry.Profile.wins
//     }));

//     res.status(200).json(formattedLeaderboardEntries);
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to retrieve leaderboard data' });
// }
// });

// module.exports = router;
