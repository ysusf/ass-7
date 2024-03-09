import taskModel from "../../../DB/models/task.model.js"
import userModel from './../../../DB/models/user.model.js'

export const addtask = async (req, res,next) => {
  const user = await userModel.findById({_id : req.user._id})
  if(!user) {
    return next(new Error ("invalid user"))
  }
  const {title , description , status ,userID, assignTo , deadline} = req.body
  userID 
//   const task = taskModel.create(req.body)
const task =  new taskModel({
    title , description , status ,userID : req.user._id, assignTo , deadline 
})
 const savedtask = await task.save()
  return res.json({message : "done" , savedtask})
}

export const updateTask = async (req ,res,next) => {
    const {taskId} = req.params
    const {title ,description , status, assignTo } = req.body
    const user = await taskModel.findOne({$and :[{userID : req.user._id}, {taskId : taskId}]})
  if(!user) {
    return next(new Error ("invalid user or task "))
  }
  const task = await taskModel.updateOne({taskId: taskId}, {title ,description , status, assignTo })
  return res.json({message : "done" , task})

}

export const deleteUser = async (req ,res,next) => { 
  const {taskId} = req.params
  const user = await taskModel.findOne({$and :[{userID : req.user._id}, {taskId : taskId}]})
if(!user) {
  return next(new Error ("invalid user or task "))
}
const deleteUser = await taskModel.deleteOne({taskId : taskId})
return res.json({message : "user is deleted "})
}
  //4-get all tasks with user data

export const allUser = async (req ,res ,next) => {
  const user = await userModel.findById({_id : req.user._id})
  if (!user) {
    return next(new Error ("invalid user "))
  }
  const allTaskAndUser = await taskModel.find().populate("userID" , "email userName")
  return res.json({message : "done" , allTaskAndUser})
}

//5-get tasks of oneUser with user data (user must be logged in)

export const oneUser = async (req ,res, next) => {

  const user = await taskModel.findById({userID : req.user._id})
  if (!user) {
    return next(new Error ("invalid user "))
  }
  const oneuser = await user.populate("_id" , "email userName ")
  return res.json({message : "done" , oneUser})
}
 // get all tasks that not done after deadline
export const allNOtDone = async (req ,res, next) => {
  const daa = new Date("2015-03-25")
  const task = await taskModel.find( {$and :[ {status: { $ne: 'done' }} , {deadline : {$gt : daa  }}]})

  return res.json({message : 'done' , task })
}