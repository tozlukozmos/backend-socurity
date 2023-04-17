const Joi = require("joi");

const registerValidation = Joi.object({
    username: Joi.string()
    .required()
    .token()
    .min(2)
    .max(17)
    .lowercase(),
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
    .required()
    .min(6)
}).options({ abortEarly: false });

const loginValidation = Joi.object({
    username: Joi.string()
    .required()
    .token()
    .min(2)
    .max(17)
    .lowercase(),
    password: Joi.string()
    .required()
    .min(6)
}).options({ abortEarly: false });

const updateValidation = Joi.object({
    username: Joi.string()
    .token()
    .min(2)
    .max(17)
    .lowercase(),
    place: Joi.string().allow(""),
    department: Joi.string().allow(""),
    profession: Joi.string().allow(""),
    email: Joi.string().allow("")
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
}).options({ abortEarly: false });

const passwordValidation = Joi.object({
    password: Joi.string()
    .required()
    .min(6)
}).options({ abortEarly: false });

module.exports = {
    registerValidation,
    loginValidation,
    updateValidation,
    passwordValidation
}