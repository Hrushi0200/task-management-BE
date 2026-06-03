
import express from "express"
import { protect } from "../middelwares/authMiddelware.js";
import { getAllUser, updateUser } from "../controllers/userController.js";

const router=express.Router();

router.get("/get",protect,getAllUser)

router.put("/update/:id",protect,updateUser)


export default router;