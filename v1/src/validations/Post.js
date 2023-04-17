const Joi = require("joi");

const createValidation = Joi.object({
    text: Joi.string()
    .required()
    .min(1)
    .max(600),
    category: Joi.string()
    .required()
}).options({ abortEarly: false });

const commentValidation = Joi.object({
    comment: Joi.string()
    .required()
    .min(1)
    .max(600),
}).options({ abortEarly: false });

module.exports = {
    createValidation,
    commentValidation
}