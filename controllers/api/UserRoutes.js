const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  try {
   const userDataDb = await User.findAll({
       attributes: { exclude: ['password']},
   });
   res.json(userDataDb);
  } catch (err) {
       res.status(500).json(err);
  }
});
  
router.post('/login', async (req, res) => {
  try {
      const userData = await User.findOne({ where: { email: req.body.email } });

      if (!userData) {
          return res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
      }

      const validPassword = await userData.checkPassword(req.body.password);
      if (!validPassword) {
          return res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
      }

      req.session.userId = userData.id;
      req.session.logged_in = true;

      req.session.save((err) => {
          if (err) {
              console.error(err);
              res.status(500).json({ error: 'Failed to save session.' });
          } else {
              res.status(200).json({ message: 'Login successful.' });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

router.post('/signup', async (req, res) => {
  try {
      const newUser = await User.create(req.body);

      req.session.userId = newUser.id;
      req.session.logged_in = true;

      req.session.save((err) => {
          if (err) {
              console.error(err);
              res.status(500).json({ error: 'Failed to save session.' });
          } else {
              res.status(201).json({ message: 'Signup successful.' });
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to sign up' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
