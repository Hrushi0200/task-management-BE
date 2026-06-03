import { loginService, registerService } from "../services/authServices.js";
import asyncHandeler from "../utils/asycHandler.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandeler(async (req, res) => {
    const { name, email, password,role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "All fileds are required"
        });
    }
    const user = await registerService({ name, email, password ,role});

    return res.status(201).json({
        success: true,
        message: "User register Successfully!",
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role:user.role,
            token: generateToken(user._id)

        }
    })

})

export const loginUser=asyncHandeler(async(req,res)=>{
    const{email,password}=req.body;

    if(!email || !password){
       return res.status(400).json({
            success:false,
            message:"Please provied all fileds!!"
        })
    }
    

    const user = await loginService({email,password});

    return res.status(200).json({
       success:true,
       message:"Login Successfully!",
       data:{
        _id:user._id,
        name:user.name, 
        email:user.email,
        role:user.role,
        token:generateToken(user._id)
       }
    })
})