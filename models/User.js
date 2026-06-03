

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        required: true,
        type: String
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
}, {
    timestamps: true
}
)

const User = mongoose.model("User", userSchema);

export default User;