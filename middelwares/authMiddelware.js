
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import User from "../models/User.js";

dotenv.config();


export const protect = async(req, res, next) => {

    try {
        let token;

        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select("-password");
            
            next();
        }
        else {
            return res.status(401).json({
                success: false,
                message: "User is not Authorized!, Token Missing"
            })
        }

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })

    }
}