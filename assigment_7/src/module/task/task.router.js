import Router from 'express'
import {asyncHandler} from './../../utils/asyncHandeller.js'
import validation from '../../middleware/validation.js'
 import { addSchema , updateSchema } from './task.validatin.js'
import { addtask, allNOtDone, allUser, deleteUser, oneUser, updateTask } from './controller/task.controller.js'
import auth from '../../middleWare/auth.js'
const router = Router()

router.post('/add', validation(addSchema) , auth,asyncHandler(addtask))
router.put('/update/:id' ,validation(updateSchema), auth ,asyncHandler(updateTask))
router.delete('/delete/:id' ,auth, asyncHandler(deleteUser))
router.get('/all' , auth,allUser)
router.get('/one' ,auth,asyncHandler(oneUser))
router.get('/deade' ,asyncHandler(allNOtDone))

export default router 