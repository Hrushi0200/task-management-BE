import Task from "../models/Task.js"


export const createTaskService= async (task)=>{

    const tasks = await Task.create(task);

    return tasks;
}

export const getAllTaskService=async(userId)=>{
    const tasks= await Task.find({
        user:userId
    }).sort({createdAt:-1});

    return tasks;
}

export const updateTaskService=async(taskId,userId,updateData)=>{

    const existingTask=await Task.findOne({_id:taskId,user:userId});

    if(!existingTask){
        throw new Error("Task not found!");
    }

    Object.assign(existingTask,updateData);

    await existingTask.save();

    return existingTask;

}

export const deletTaskService=async(taskId,userId)=>{

    const existingTask=await Task.findOne({_id:taskId,user:userId});

    if(!existingTask){
    throw new Error("Task not found!");
    }

    await Task.deleteOne({_id:existingTask._id});

    return existingTask ;

}