const mongoose = require('mongoose');

// Define the user schema
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
    role: {
        type: String,
        enum: ['user', 'staff','admin'], // Define the possible roles
        default: 'user' // Default role if not specified
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    number: {
        type: String
    },
    points: {
        type: Number,
        default: 0 // Default value for points is 0
      }
});

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
