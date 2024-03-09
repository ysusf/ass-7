import { Router } from "express";
import {asyncHandler} from './../../utils/asyncHandeller.js'
// import generalFields from './../../utils/generalFields.js'
import validation   from   '../../middleWare/validation.js' ;
import auth from './../../middleWare/auth.js'
import{chanagePassword, deleteUser, softDelete, updateUser , logOut , forgetUser,unsubscription} from './controller/user.controller.js'
import { upadateSchema , cahangePasswordSchema , unsubscriptionSchema, forgetSchema } from "./user.validation.js";
const router = Router()
router.patch('/update' , validation(upadateSchema) ,auth,asyncHandler(updateUser))
router.patch('/updatepassword', validation(cahangePasswordSchema) , auth,asyncHandler(chanagePassword))
router.get('/delete' ,auth,asyncHandler(deleteUser))
router.get('/softdelete',auth,asyncHandler(softDelete))
router.get('/logout' , asyncHandler(logOut))
router.post('/forgetUser' ,validation(forgetSchema),  asyncHandler(forgetUser))
router.patch ('/unsubscription' ,validation(unsubscriptionSchema) ,asyncHandler(unsubscription))


export default router 