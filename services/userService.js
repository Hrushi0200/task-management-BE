import User from "../models/User.js"
import bcrypt from "bcryptjs";


export const getUserService=async()=>{

    const users=await User.find();

    if(!users){
        throw new Error("No user found!")
    }

    return users;
}

export const updateUserService=async(userId ,{name,email,password})=>{

    const existingUser=await User.findOne({_id:userId});


    if(!existingUser){
        throw new Error("User not found!");
    }
    if(name){
        existingUser.name=name;
    }
    if(email){
        existingUser.email=email;
    }
    if(password){
    const hashpassword=await bcrypt.hash(password,10);
    existingUser.password=hashpassword;
    }

    const updateduser=await existingUser.save();
    return updateduser;
}