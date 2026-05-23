import { createTaskService, deletTaskService, getAllTaskService, updateTaskService } from "../services/taskService.js";
import asyncHandeler from "../utils/asycHandler.js";


export const createTask=async(req,res)=>{
 
    const{ title, description, status, priority, dueDate }=req.body;

     if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title is required",
        });
    }

      const task = await createTaskService({
        title,
        description,
        status,
        priority,
        dueDate,
        user: req.user._id,
    });

     res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
    });
}

export const getTask=async(req,res)=>{

    const tasks=await getAllTaskService(req.user._id);
    res.status(200).json({
        success:true,
        data:tasks,
    })
}

export const updateTask=asyncHandeler(async(req,res)=>{
    const updatedTask=await updateTaskService(
        req.params.id,
        req.user._id,
        req.body
    )

    res.status(200).json({
        success:true,
        message:"Task Updated successfully!",
        data:updatedTask
    })
})

export const deletTask=asyncHandeler(async(req,res)=>{
    const deletedTask=await deletTaskService(req.params.id,req.user._id);
  
    res.status(200).json({
        success:true,
        message:"Task deleted successfully!",
        data:deletedTask
    })

})