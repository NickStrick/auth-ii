require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    locked: (req, res, next) => {
        const token = req.headers.suthorization;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({
                        msg: 'invalid token'
                    });
                } else {
                    req.decodedToken = decodedToken;
                    next();
                }
            })
        } else {
            res.status(401).json({
                message: 'no token provided'
            });
        }
    },
    gToken: (req, res, next) => {
        const payload = {
            username: user.username,
            department: user.department,
        };

        const secret = process.env.JWT_SECRET;

        const options = {
            expiresIn: '10m',
        };

        return jwt.sign(payload, secret, options);
    },
    checkRole: (req, res, next) => {

    },
}