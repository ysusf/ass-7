import userModel from './../../../DB/models/user.model.js'
import bycrpt from 'bcryptjs'
import crypto from 'crypto-js'
//change password 
export const chanagePassword = async (req ,res ,next) =>  {
    const {oldPassword , newPassword } = req.body
    const user = await userModel.findById({_id : req.user._id })
    if(!user) {
        return next(new Error ("login before change password "))
    }
     const match = bycrpt.compareSync(oldPassword , user.password) 
     if(!match) {
        return next(new Error ("oldPassword is not correct "))
     }
     const hashPassword = bycrpt.hashSync(newPassword , +process.env.ROUND)
     newPassword = hashPassword
    req.user.password = newPassword
    await user.save()    
    return res.json({message : "done password changed "})
}
 //update user
export const updateUser = async (req,res,next) => {
    const {email , userName} = req.body 
    // console.log(req.user._id)
    const user = await userModel.findById({_id :req.user._id})
    if(!user) {
        return next(new Error ("login before change password "))
    }
     if (email == user.email) {
        return (new Error ("please enter new email") )
     }
    const newUser = await userModel.findByIdAndUpdate({_id :req.user._id} , {  email , userName } )
     return res.json({message : "done" , newUser})
}
//delete user 
export const deleteUser = async(req,res, next) => {
    const user = await userModel.findByIdAndDelete({_id :req.user._id})
    return !user? res.json({message : "user must be login "}) :  res.json({message : "done"})
}

//soft delete ll
export const softDelete = async (req ,res, next) => {
    const user = await userModel.findById({_id :req.user._id} )
    if(!user || user.deleted === true) {
        return res.json({message : "invalid user "})
    }
     const soft = await userModel.findByIdAndUpdate({_id : req.user._id } , {deleted : true})
     return res.json({message : "done user deleted "} )
}
// logOut 
//logOut 
export const logOut = async (req ,res, next) => {
    const {userId} = req.params 
    const user = await userModel.findByIdAndUpdate({userId} , {loggedIn : false}) 
    return res.json({message : "user is logOut "})
 }
 // forget 

 export const forgetUser = async (req ,res ,next) => {
    const {email} = req.body
    const user = await userModel.findOne({email})
    if(!user) {
        return next (new Error ('user not found '))
    }
    // const generateResetToken = () => {
    //     const token = crypto.randomBytes(20).toString('hex');
    //     return token;
    //   };
    const resetToken = generateResetToken();
    console.log(resetToken)
    user.resetToken = resetToken;
     await user.save();
    return res.json ({message : "resat token " , token })
 }

//  unsubiscribe 

 export const unsubscription = async (req ,res, next) => {
    const {email} = req.body
    // const {email} = req.body
    const user = await userModel.findOne({email})
    if(!user) {
        return next (new Error ('user not found '))
    }

    user.subscription = false 
    await user.save()
    return res.json({message : "done user unsusicrib "})
    
 }







