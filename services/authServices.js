import User from "../models/User.js"
import bcrypt from "bcryptjs";

export const registerService = async ({ name, email, password,role }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name, email, password: hashPassword,role
    })
    return user;

}


export const loginService=async ({email,password})=>{
    
    const user = await User.findOne({email});
    if(!user){
        throw new Error("User not Found!");
    }

    const matchPassword=await bcrypt.compare(password, user.password);

    if(!matchPassword){
        throw new Error ("Invalid Crediantial");
    }

    return user;
}