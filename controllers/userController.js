import { getUserService, updateUserService } from "../services/userService.js";
import asyncHandeler from "../utils/asycHandler.js";

export const getAllUser=asyncHandeler(async(req,res)=>{

    const users=await getUserService();

    res.status(200).json({
        success:true,
        data:users
    })
})

export const updateUser=asyncHandeler(async(req,res)=>{ 


    const UpdatedUser=await updateUserService(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:"User has been updated successfully!",
        data:UpdatedUser,
    })
})