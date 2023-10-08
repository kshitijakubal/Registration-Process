const Joi = require('joi');

const validateRegisteration = Joi.object({
    name: Joi.string(),
    grade: Joi.number(),
    email: Joi.string().required(),
    phone_no: Joi.string().length(10).pattern(/^[0-9]+$/),
    state: Joi.string(),
    city: Joi.string(),
    school_name: Joi.string()
})

const validateOtpVerification = Joi.object({
    email: Joi.string().required(),
    user_otp: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
    isNew: Joi.boolean().required(),
})

module.exports = { validateRegisteration, validateOtpVerification }