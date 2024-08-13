import Joi from "joi";

export const categoryValidator = Joi.object({
    name : Joi.string().required().min(3).max(255).messages({
        'string.empty': 'name phải điền đầy đủ',
        'any.required': 'name là bắt buộc!',
        'string.min': 'name phải điền đầy đủ (#litmit) ký tự',
        'string.max': 'name phải điền đầy đủ (#litmit) ký tự',
    }),
    slug : Joi.string().required().min(3).max(255).messages({
        'string.empty': 'slug phải điền đầy đủ',
        'any.required': 'slug là bắt buộc!',
        'string.min': 'slug phải điền đầy đủ (#litmit) ký tự',
        'string.max': 'slug phải điền đầy đủ (#litmit) ký tự',
    })
})