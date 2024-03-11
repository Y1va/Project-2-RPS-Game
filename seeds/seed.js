const sequelize = require('../config/connection.js');
const { User, ForumPost, ReplyPost } = require('../models');

const userData = require('./userData.json');
const forumPostData = require('./forumPostData.json');
const replyPostData = require('./replyPostData.json');

const seedDatabase = async () => {
try {
    await sequelize.sync({ force: true }); 

    const users = await User.bulkCreate(userData, {
        individualHooks:true,
        returning: true
    });

    const forumPosts = await ForumPost.bulkCreate(forumPostData, {
        returning: true
    });

    for (const reply of replyPostData) {
        const forumPost = forumPosts.find(post => post.id === reply.forumPostId);
        await ReplyPost.create({
        ...reply, 
        forumPostId: forumPost.id});
    }
    console.log('Database seeded successfully!');
    process.exit(0);
} catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
    }
}

seedDatabase();
