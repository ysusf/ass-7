import { Schema , model , Types} from "mongoose";
import bcrypt from 'bcryptjs'
// import { string } from "joi";
 
const userSchema = new Schema ({
    userName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true
      },
      age: {
        type: Number
      },
      gender: {
        type: String,
        enum: ['Male', 'Female']
      },
      phone: {
        type: String
      } ,
      confirmEmail : {
        type : Boolean ,
        default : false 
      },
      deleted : {
        type : Boolean ,
        default : false 
      } ,
       subscription  : {
        type : Boolean ,
        default : true 
       }
} , {
    timestamps : true ,
})

const userModel = model ("User" , userSchema)

export default userModel