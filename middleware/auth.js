// auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Unauthorized: Token missing');
    }

    try {
        const tokenValue = token.split(' ')[1];
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized: Invalid token');
    }
};

module.exports = auth;
