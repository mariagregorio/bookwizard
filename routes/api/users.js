const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// POST /users/register
router.post('/register', (req, res) => {
    // check if email exists in db, and write to db
    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                return res.status(400).json({message: 'Email already exists'});
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: gravatar.url(req.body.email, {s:'200', d: 'mm'}),
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

// POST /users/login
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user => {
            // check for user
            if(user) {
                // check for password
                bcrypt.compare(password, user.password, (err, match) => {
                    if (err) throw err;
                    if (match) {
                        res.json({message: 'Welcome'})
                    } else {
                        return res.status(400).json({message: 'Incorrect password'});
                    }
                });
            } else {
                return res.status(404).json({message: 'Email not registered'});
            }
        })
});

module.exports = router;
