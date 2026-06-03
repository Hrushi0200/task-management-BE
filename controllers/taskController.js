import { createTaskService, deletTaskService, getAllTaskService, getTaskService, updateTaskService } from "../services/taskService.js";
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

    const page=Number(req.query.page)||1;
    const limit=Number(req.query.limit) || 1;

    const search =req.query.search;
    const status=req.query.status;
    const priority=req.query.priority;
    const sort=req.query.sort;

    const result=await getTaskService(req.user._id,page,limit,search,status,priority,sort);
    res.status(200).json({
        success:true,
        ...result,
    })
}

export const getAllTask=async(req,res)=>{
    const tasks =await getAllTaskService();

    res.status(200).json({
        success:true,
        data:tasks
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