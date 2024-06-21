const { check, validationResult } = require('express-validator');
const validator = require('validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
exports.register = [
    
    check('username', 'Username is required').notEmpty().trim().escape(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').notEmpty().isLength({ min: 6 }).trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            user = new User({ username, email, password });
            user.roles = ['chasseur'];
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            const payload = {
                user: {
                    id: user.id
                }
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            user.token = token;
            await user.save();
            res.status(201).json({ token });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
];

exports.login = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').notEmpty().trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'User does not exist' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Incorrect password' });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            user.token = token;
            await user.save();

            res.status(200).json({ token });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
];

exports.signOut = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.token = null;
        await user.save();
        return res.status(200).send('Disconnected');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getInfoUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateProfile = [
    check('username', 'Username is required').optional().notEmpty().trim().escape(),
    check('email', 'Please include a valid email').optional().isEmail().normalizeEmail(),
    check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 }).trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            if (username) user.username = username;
            if (email) user.email = email;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }

            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
];

exports.forgotPassword = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            const newPassword = generateRandomPassword();

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            user.password = hashedPassword;
            await user.save();
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Password Recovery for Treasure Caching',
                html: `
                    <p>Hello ${user.username},</p>
                    <p>We received a request to reset your password for your account in the game <strong>Treasure Caching</strong>.</p>
                    <p>Your new temporary password is: <strong>${newPassword}</strong></p>
                    <p>Please use this temporary password to log in to your account. After logging in, we recommend you change your password to something more secure.</p>
                    <p>If you did not request this password reset, please ignore this email and your password will remain unchanged.</p>
                    <p>Thank you,</p>
                    <p>The Treasure Caching Team</p>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ msg: 'Error sending email' });
                }
                res.status(200).json({ msg: 'Email sent' });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
];

function generateRandomPassword() {
    return Math.random().toString(36).slice(-8);
}