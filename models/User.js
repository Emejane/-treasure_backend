const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        enum: ['chasseur', 'organisateur'],
        default: ['chasseur']
    },
    token: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);
