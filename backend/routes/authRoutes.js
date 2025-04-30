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

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (!user) {
            return res.json({ success: false, message: 'Authentication failed' });
        }

        req.login(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ success: false, error: loginErr.message });
            }

            return res.json({ success: true, user });
        })
    })(req, res, next)
})

router.get('/check-auth', (req, res) => {
    console.log("User auth", req. isAuthenticated)
    if(req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
    } else {
        res.json({ authenticated: false, user: null });
    }
})

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({success: true});
    })
})

module.exports = router;