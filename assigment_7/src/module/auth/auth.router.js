import {Router} from 'express'
import {signUP ,confirmEmail, refreshToken,login } from './controller/auth.controller.js'
import {asyncHandler} from './../../utils/asyncHandeller.js'
import validation from './../../middleWare/validation.js'
import { signupSchema , loginSchema } from './auth.validation.js'
const router = Router()


router.post('/signUP' , validation(signupSchema),asyncHandler(signUP))
router.get('/confirmEmail/:token',confirmEmail)
router.get('/refreshToken/:token' , refreshToken)
router.post('/login' ,validation(loginSchema),asyncHandler(login))

export default router 