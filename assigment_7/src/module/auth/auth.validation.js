import joi from 'joi'
import generalFields from './../../utils/generalFields.js'

export const signupSchema = joi.object({
    email: generalFields.email,
    userName: joi.string().min(3).max(20).required(),
    gender: joi.string().valid('Male', 'Female'),
    password: generalFields.password,
    cPassword: joi.string().valid(joi.ref('password')).required()
}).required()




export const loginSchema = joi.object({
    email: generalFields.email,
    password: generalFields.password
}).required()
