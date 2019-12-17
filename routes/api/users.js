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
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

module.exports = router;