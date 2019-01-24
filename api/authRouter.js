require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

module.exports = router;

const db = require('../data/db.js');
const ware = require('./middleware.js');

router.post('/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14)

    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({
            err,
            msg: 'woops'
        }))
})

router.post('/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({
            username: creds.username
        })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {

                const token = ware.generateToken(user);

                res.status(200).json({
                    message: `welcome ${user.username}`,
                    token
                });
            } else {
                res.status(401).json({
                    you: 'shall not pass!!'
                });
            }
        })
        .catch(err => res.status(500).json({
            err,
            msg: 'broke'
        }));
});

router.get('/users', ware.locked, async (req, res) => {
    const users = await db('users').select('id', 'username', 'department');

    res.status(200).json({
        users,
        decodedToken: req.decodedToken,
    });
})