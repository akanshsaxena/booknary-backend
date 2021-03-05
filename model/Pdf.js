const mongoose = require('mongoose');

const pdfSchema = mongoose.Schema({
    authorId: {
        type: String,
        required: true,
    },
    pdf: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('pdfs', pdfSchema);