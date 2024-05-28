const express = require('express');
const router = express.Router();
const { register, login, signOut} = require('../controllers/authController');

router.post('/register', register);

router.post('/login', login);

router.post('/logout/:id', signOut);

module.exports = router;
