

import express from "express";
import { createTask, deletTask, getTask, updateTask } from "../controllers/taskController.js";
import { protect } from "../middelwares/authMiddelware.js";

const router =express.Router();


router.post("/create",protect , createTask);

router.get('/get',protect,getTask);

router.delete('/delete/:id',protect,deletTask);

router.put("/update/:id",protect,updateTask);


export default router;