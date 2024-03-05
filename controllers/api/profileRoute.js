//installing required functions and retrieving class from model section to utlise in app.get
const router = require('express').Router();
const Newuser = require('../../models/Newuser');

//must have route to ensure that the info can only be accessed by individuals thgat are logged in.


// require app.get in order to retrieve information for profile picture to be presented.
// Used attributes to specify which info we want
router.get('/:id', async (req, res) => {
    try{ 
        const profileData = await Newuser.findByPk({
            attributes: ['username', 'birthday', 'gender']
        })
        if(!profileData) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.status(200).json(profileData);
    } catch(err){
        res.status(500).json(err);
    }
});


// always ensure that the inbdividual can log out.
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
  