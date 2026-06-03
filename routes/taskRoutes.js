

import express from "express";
import { createTask, deletTask, getAllTask, getTask, updateTask } from "../controllers/taskController.js";
import { protect } from "../middelwares/authMiddelware.js";
import { roleMiddelweare } from "../middelwares/roleMiddelware.js";

const router =express.Router();


router.post("/create",protect , createTask);

router.get('/get',protect,getTask);

router.get('/all', protect,roleMiddelweare("admin"),getAllTask)

router.delete('/delete/:id',protect ,deletTask);

router.put("/update/:id",protect ,updateTask);


export default router;