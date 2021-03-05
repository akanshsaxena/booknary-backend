const Joi = require("@hapi/joi");

const validatePdf = (post) => {
    const schema = {
        authorId: Joi.string().min(2).required(),
        pdf: Joi.string().required(),
        title: Joi.string().required()
    }
    return Joi.validate(post, schema);
}

module.exports.validatePdf = validatePdf;