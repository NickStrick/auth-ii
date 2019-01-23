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