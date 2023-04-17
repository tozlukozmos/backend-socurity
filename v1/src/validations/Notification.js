const Joi = require("joi");

const createValidation = Joi.object({
    actionType: Joi.number()
    .required(),
    postId: Joi.string()
}).options({ abortEarly: false });

module.exports = {
    createValidation
}