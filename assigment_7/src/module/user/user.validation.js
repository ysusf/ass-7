import joi from 'joi'
// import {validationId} from './../../middleWare/validation.js'
import generalFields from './../../utils/generalFields.js'

 export const upadateSchema =  joi.object({
    email : generalFields.email,
    userName : generalFields.name ,
    authorization : generalFields.authorization
 }).required()


 export const cahangePasswordSchema = joi.object({
    oldpassword : generalFields.password ,
    newpassword : generalFields.password
 }).required()

 export const unsubscriptionSchema = joi.object({
   email : generalFields.email
 })

 export const forgetSchema  = joi.object({
   email : generalFields.email
 })