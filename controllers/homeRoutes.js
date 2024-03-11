const router = require('express').Router();
const { User, ForumPost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('layouts/main');
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('login', { isLoginPage: true, isSignupPage: false });
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('signup', { isLoginPage: false, isSignupPage: true });
});

router.get('/homepage', (req, res) => {
    if (req.session.logged_in) {
        res.render('homepage', { logged_in: true });
    } else {
        res.render('homepage', { logged_in: false });
    }
});

router.get("/communityforum", async (req, res) => {
    try {
        if (!req.session.logged_in) {
            return res.redirect('/login');
        }
        
        const forumPostData = await ForumPost.findAll({  
            include: [{ model: User, attributes: [ 'name', 'email'] }],
        });
        const forumPosts = forumPostData.map((post) => post.get({ plain: true }));
        
        res.render('communityforum', { 
            forumPosts,
            logged_in: req.session.logged_in,
            isCommunityForum: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
      const postData = await ForumPost.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
          },
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('post', {
        ...post,
        logged_in: req.session.logged_in,
        isPostPage: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/addForumPost', (req, res) => {
    res.render('addForumPost', { isAddPost: true, logged_in: true });
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] }
        });
        const user = userData.get({ plain: true });
  
        res.render('profile', {
            ...user,
            isProfilePage: true,
            logged_in: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
  });

router.get('/support', (req, res) => {
    if (req.session.logged_in) {
    res.render('support', { isSupportPage: true, logged_in: true });
    } else {
        res.render('login', { isLoginPage: true, logged_in: false });
    }
});

router.get('/leaderboard', (req, res) => {
    if (req.session.logged_in) {
    res.render('leaderboard', { isLeaderboardPage: true, logged_in: true });
    } else {
        res.render('login', { isLoginPage: true, logged_in: false });
    }
});

router.get('/match', (req, res) => {
    if (req.session.logged_in) {
    res.render('match', { isRpsPage: true, logged_in: true });
    } else {
        res.render('login', { isLoginPage: true, logged_in: false });
    }
});

module.exports = router;
