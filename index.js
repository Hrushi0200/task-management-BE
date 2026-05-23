
import express from 'express'
import dotenv from 'dotenv'
import { connectDB }  from "./config/db.js";
import errorMiddelware from './middelwares/errorMiddelware.js';
import authRoute from "./routes/authRoutes.js"
import taskRoute from "./routes/taskRoutes.js"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
connectDB();
dotenv.config();
const PORT=process.env.PORT;
//creating app
const app=express();

app.use(express.json())

//Routes
app.use("/api/auth",authRoute)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use("/api/task",taskRoute)

app.use(errorMiddelware);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})

