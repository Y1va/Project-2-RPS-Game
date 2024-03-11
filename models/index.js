const User = require('./User');
const ForumPost = require('./ForumPost');
const ReplyPost = require('./ReplyPost');
const LeaderboardEntry = require('./LeaderboardEntry');
const Match = require('./Match');

User.hasMany(ForumPost, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

User.hasMany(ReplyPost, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

User.hasMany(LeaderboardEntry, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

User.hasMany(Match, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });

ForumPost.belongsTo(User, {
    foreignKey: 'userId'
});

ForumPost.hasMany(ReplyPost, {
    foreignKey: 'forumPostId',
    onDelete: 'CASCADE'
});

ReplyPost.belongsTo(User, {
    foreignKey: 'userId'
});

ReplyPost.belongsTo(ForumPost, {
    foreignKey: 'forumPostId'
});

LeaderboardEntry.belongsTo(User, {
    foreignKey: 'userId',
});
  
Match.belongsTo(User, {
    foreignKey: 'userId',
  });
  
module.exports = { User, ForumPost, ReplyPost, LeaderboardEntry, Match };
