const Joi = require("@hapi/joi");

const validatePost = (post) => {
    const schema = {
        authorId: Joi.string().min(2).required(),
        title: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(1024).required(),
        readTime: Joi.string().min(2).max(255).required(),
        category: Joi.string().min(1).max(255).required(),
        language: Joi.string().min(1).max(255).required(),
        author: Joi.string().min(2).max(255).required(),
        thumbnailImg: Joi.string().min(6).required(),
        pdfLink: Joi.string().min(6).required(),
        votes: Joi.string(),
    }
    return Joi.validate(post, schema);
}

module.exports.validatePost = validatePost;