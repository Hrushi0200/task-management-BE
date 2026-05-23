
import mongoose from "mongoose"
const taskSchema = mongoose.Schema({

    title: {
        required: true,
        type: String,
    },

    description: {
        type: String,
    },

    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },

    dueDate: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }


},
    { timestamps: true })

const Task = mongoose.model("Tasks", taskSchema);

export default Task;