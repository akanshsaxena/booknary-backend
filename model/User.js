const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    mobNum: {
        type: Number,
        required: false,
    },
    description: {
        type: Number,
        required: false,
    },
    gender: {
        type: Number,
        required: false,
    },
    country: {
        type: Number,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('users', userSchema);