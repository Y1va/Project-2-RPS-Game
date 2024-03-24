const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth'); // Importing authentication middleware

// Route to get all user data (excluding password)
router.get("/", async (req, res) => {
  try {
   const userDataDb = await User.findAll({
       attributes: { exclude: ['password']},
   });
   res.json(userDataDb); // Sending user data as JSON response
  } catch (err) {
       res.status(500).json(err); // Handling errors
  }
});
  
// Route to handle user login
router.post('/login', async (req, res) => {
  try {
      // Finding user data by email
      const userData = await User.findOne({ where: { email: req.body.email } });

      if (!userData) {
          // Handling incorrect email or password
          return res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
      }

      // Checking if password is valid
      const validPassword = await userData.checkPassword(req.body.password);
      if (!validPassword) {
          // Handling incorrect email or password
          return res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
      }

      // Creating session for logged-in user
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

// Route to handle user signup
router.post('/signup', async (req, res) => {
  try {
      // Creating a new user
      const newUser = await User.create(req.body);

      // Creating session for newly signed-up user
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

// Route to handle user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroying session for logged-out user
    req.session.destroy(() => {
      res.status(204).end(); // Sending no content status
    });
  } else {
    res.status(404).end(); // Handling if user is not logged in
  }
});

module.exports = router;
