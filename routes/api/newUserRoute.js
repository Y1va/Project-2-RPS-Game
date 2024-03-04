//installing required functions and retrieving class from model section to utlise in app.get
const router = require('express').Router();
const Newuser = require('../../models/Newuser');

// wireFrame page to create new user only requires app.post as data is be created and nothing else.
router.post('/', async (req, res) => {
    try {
        const userData = await Newuser.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday, 
            gender: req.body.gender, 
            username: req.body.username, 
            password: req.body.password,
        });
        res.status(200).json(userData);
    } catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;