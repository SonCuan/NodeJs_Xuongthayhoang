import Joi from "joi";

export const signUpValidator = Joi.object({
    userName : Joi.string().min(6).max(255).required().messages({
        'string.empty': 'userName không được để trống',
        'any.required': 'userName là bắt buộc!',
        'string.min': 'userName phải có ít nhất (#litmit) ký tự',
        'string.max': 'userName phải ít hơn (#litmit) ký tự',
    }),
    email : Joi.string().email().required().messages({
        "string.empty" : "Email không được để trống",
        "any.required" : "Email là bắt buộc!",
        "string.email" : "Email không đúng định dạng"
    }),
    password : Joi.string().min(6).max(255).required().messages({
        "string.empty" : "Password không được để trống",
        "any.required" : "Password là bắt buộc!",
        "string.min" : "Password phải có ít nhất (#litmit) ký tự",
        "string.max" : "Password phải ít hơn (#litmit + 1) ký tự",
    }),
    confirmPassword :Joi.string().min(6).max(255).required().valid(Joi.ref('password')).messages({
        "string.empty" : "confirmPassword không được để trống",
        "any.required" : "confirmPassword là bắt buộc!",
        "string.min" : "confirmPassword phải có ít nhất (#litmit) ký tự",
        "string.max" : "confirmPassword phải ít hơn (#litmit + 1) ký tự",
        "any.only" : "confirmPassword không khớp với password"
    })
})

export const signInValidator = Joi.object({
    email : Joi.string().email().required().messages({
        "string.empty" : "Email không được để trống",
        "any.required" : "Email là bắt buộc!",
        "string.email" : "Email không đúng định dạng"
    }),
    password : Joi.string().min(6).max(255).required().messages({
        "string.empty" : "Password không được để trống",
        "any.required" : "Password là bắt buộc!",
        "string.min" : "Password phải có ít nhất (#litmit) ký tự",
        "string.max" : "Password phải ít hơn (#litmit + 1) ký tự",
    })

})