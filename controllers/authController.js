const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.register = async (req, res) => {
    const { username, email, password, roles } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, email, password, roles });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        const payload = {
            user: {
                id: user.id
            }
        };

        user.token = jwt.sign(payload, process.env.JWT_SECRET);
        await user.save();
        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
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
        res.status(200).json({ token });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Logout user
exports.signOut = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const token = req.headers['authorization'];
            if (token === user.token) {
                user.token = null;
                await user.save();
                return res.status(200).send('Disconnected');
            }
            return res.status(401).send('Unauthorized');
        }
        return res.status(404).send('User not found');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
