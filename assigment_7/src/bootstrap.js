import connection from "./db/connection.js"
import userRouter from './module/user/user.router.js'
import authRouter from './module/auth/auth.router.js'
import taskRouter from './module/task/task.router.js'
import { globalError } from "./utils/asyncHandeller.js"

const bootstrap = (app ,express) => {
   app.use(express.json())
    connection()
    app.use('/user' , userRouter)
    app.use('/user' , authRouter)
    app.use('/task' , taskRouter)

    app.use(globalError)
   app.use("*" , (req,res,next)=>{
      return res.json({message : "invalid routing "})
   } )
}


export default  bootstrap