import { Schema , model ,Types } from "mongoose";

const taskSchema = new Schema ({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      status: {
        type: String,
        enum: ['toDo', 'doing', 'done'],
        default: 'toDo'
      },
      userID: {
        type:Types.ObjectId,
        ref: 'User',
      },
      assignTo: {
        type:Types.ObjectId,
        ref: 'User',
        required :true
      },
      deadline: {
        type: Date
      }
}, {
    timestamps : true 
})


const taskModel = model("Task" , taskSchema)
export default taskModel