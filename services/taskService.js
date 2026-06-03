import Task from "../models/Task.js"


export const createTaskService = async (task) => {

    const tasks = await Task.create(task);

    return tasks;
}

export const getTaskService = async (userId, page, limit, search, status, priority, sort) => {
    const skip = (page - 1) * limit;

    const query = {
        user: userId
    }

    if (search) {
        query.title = {
            $regex: search,
            $option: "i"
        }
    }

    if (status) {
        query.status = status
    }
    if (priority) {
        query.priority = priority
    }

    const sortOption = {};
    if (sort == "latest") {
        sortOption.createdAt = -1;
    }
    else if (sort == "oldest") {
        sortOption.createdAt = 1;
    }
    else if (sort == "title") {
        sortOption.title = 1;
    }

    const total = await Task.countDocuments(query)
    const tasks = await Task.find(query).sort(sortOption).skip(skip).limit(limit).populate("user", "name email");

    return { tasks, page, totalPages: Math.ceil(total / limit), total };
}

export const getAllTaskService=async ()=>{

    const tasks =await Task.find().populate('user','name email role');

    return tasks
}

export const updateTaskService = async (taskId, userId, updateData) => {

    const existingTask = await Task.findOne({ _id: taskId, user: userId });

    if (!existingTask) {
        throw new Error("Task not found!");
    }

    Object.assign(existingTask, updateData);

    await existingTask.save();

    return existingTask;

}

export const deletTaskService = async (taskId, userId) => {

    const existingTask = await Task.findOne({ _id: taskId, user: userId });

    if (!existingTask) {
        throw new Error("Task not found!");
    }

    await Task.deleteOne({ _id: existingTask._id });

    return existingTask;

}