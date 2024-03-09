import userModel from '../../../DB/models/user.model.js'
import sendEmail from '../../../utils/email.js'
import jwt from 'jsonwebtoken'
import bycrpt from 'bcryptjs' 

export const signUP = async (req ,res, next ) => {
    const { userName, email, password,age , gender,phone} = req.body 
    const user = await userModel.findOne({email})
     if(user) {
        return next (new Error ("user have a acount "))
     }
     const hashPassword = bycrpt.hashSync(password , +process.env.ROUND)
      req.body.password = hashPassword     
      const newUser = await userModel.create (req.body)
      const token = jwt.sign({_id : newUser._id , email : newUser.email },
        process.env.SIGNSEGNATURE , 
        {expiresIn : 60*60})
        const link = `${req.protocol}://${req.headers.host}/user/confirmemail/${token}`
        const refreshToken = jwt.sign({_id : newUser._id , email : newUser.email },
            process.env.SIGNSEGNATURE , 
            {expiresIn : 60*60})
            const refreshLink = `${req.protocol}://${req.headers.host}/user/refreshToken/${refreshToken}`
            

            sendEmail({
                to: email, subject: 'confirm email', html: `<a href='${link}'>confirm email</a>
            <br>
            <br>
            <a href='${refreshLink}'>send refresh token</a>
            ` })
            
    return newUser ? res.json({ message: "done", newUser }) : res.json({ messag: "invalid add new user" })

}

export const confirmEmail = async (req, res ,next) => {
    const {token} = req.params 
    const payload = jwt.verify(token , process.env.SIGNSEGNATURE)
    const confirm = await userModel.findByIdAndUpdate({_id : payload._id} , {confirmEmail : true })
    return res.redirect('http://127.0.0.1:5500/sign-up-login-form/logIn/')

}

export const refreshToken = async (req ,res, next ) => {
    const {token} = req.params 
    const payload = jwt.verify(token , process.env.SIGNSEGNATURE)
    const newToken = jwt.sign({_id : payload._id , email : payload.email} ,process.env.SIGNSEGNATURE ,
        {expiresIn : 60*2} )

    const link = `${req.protocol}://${req.header.host}/user/confirmEmail/${newToken}`
    sendEmail({
        to: payload.email, subject: 'confirm email', html: `<a href='${link}'>confirm email</a>`
    })
    return res.json({ message: "check your email" })
}

export const login=  async (req ,res ,next) => {
    const {email , password } = req.body
    const user = await userModel.findOne({email})
    if(!user) {
        return next(new Error ("invalid email or password"))

    }

    // if (!user.confirmEmail) {
    //     return next(new Error('please confirm email first'))
    // }
    const match = bycrpt.compareSync(password , user.password)
    if(!match) {
        return next(new Error ("invalid email or password "))
    }
    const token = jwt.sign({_id : user._id , email : user.email}, process.env.TOKEN_SIGNETURE , {expiresIn : 60*60})
    return res.json({meassage : "done" , token})
}
