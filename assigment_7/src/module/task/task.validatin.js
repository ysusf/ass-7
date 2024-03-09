import joi from 'joi'
// import {validationId} from './../../middleWare/validation.js'
import generalFields from './../../utils/generalFields.js'

export const addSchema = joi.object({
    title  : generalFields.name ,
    description : joi.string().required() ,
     status  : joi.string().required()  ,
     userID : generalFields.id , 
     assignTo  : generalFields.id ,
     deadline : joi.date().required() ,
     authorization : generalFields.authorization 
}) .required()

export const updateSchema = joi.object ({
    taskId : generalFields.id  ,
    description : joi.string().required() ,
    status  : joi.string().required()  ,
    userID : generalFields.id , 
    assignTo  : generalFields.id ,
    authorization : generalFields.authorization
}).required()