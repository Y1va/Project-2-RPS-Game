//installing required functions and retrieving class from model section to utlise in app.get and app.post for login page 
const router = require('express').Router();
const Newuser = require('../../models/Newuser');

// this route helps find the username by its id in the login page
router.get('/:id', async (req, res) => {
    try{ 
        const userData = await Newuser.findByPk(req.params.id);
        if(!userData) {
            res.status(404).json({ message: 'Please check username and password!'});
            return;
        }
        res.status(200).json(userData);
    } catch(err){
        res.status(500).json(err);
    }
})
// this helps such that is the username is not correct or the password, they are unable to log in
// and presented with the information. Only ablew to log in if the pass and username is correct/ available in teh database.
router.post('/login', async(req, res) => {
    try {
        const userData = await Newuser.findOne({ where: {id: req.body.id}});
        if(!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again'});
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again'});
            return;
        }
        res.json({ user: userData, message: 'You are now logged in!'})
    } catch(err) {
        res.status(400).json(err)
    }
});


module.exports = router;