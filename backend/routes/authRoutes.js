const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User')

router.post('/register', async (req, res) => {
    try {
        
        const isAdmin = req.body.isAdmin === true;
        const user = await User.register(new User({ username: req.body.username, isAdmin }), req.body.password);
        passport.authenticate('local')(req, res, () => {
            res.json({ success: true, user })
        })
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})


module.exports = router;