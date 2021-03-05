const mongoose = require('mongoose');
const vote = "0";
const postSchema = mongoose.Schema({
    authorId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    readTime: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    thumbnailImg: {
        type: String,
        required: true,
    },
    pdfLink: {
        type: String,
        required: true,
    },
    votes: {
        type: String,
        default: vote,
    }
});

module.exports = mongoose.model('books', postSchema);