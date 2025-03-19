import bodyParser from 'body-parser';
import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import cors from 'cors'
import cvUserRoutes from './routes/cvUserRoutes.js';
import skillsRoutes from './routes/skillsroutes.js';
import certificates from './routes/certificatesRoutes.js';
import refereeRoutes from './routes/refereesRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import ExperienceRoutes from './routes/experienceRoutes.js';
import ProjectRouter from './routes/projectsRouter.js';
import userRouter from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js';



dotenv.config()
const app = express();



app.use(cors());
app.use(bodyParser.json())









const mongodbURL = process.env.MONGODB_URI


mongoose.connect(mongodbURL,{})
const connection = mongoose.connection;

connection.once("open",() => {
    console.log("Database Connected!!");
})

app.use("/api/cvuser",cvUserRoutes)
app.use("/api/skills",skillsRoutes)
app.use("/api/certificates",certificates)
app.use("/api/referees",refereeRoutes)
app.use("/api/education",educationRoutes)
app.use("/api/experience",ExperienceRoutes)
app.use("/api/projects",ProjectRouter)
 





















// user routes
app.use("/api/users",userRouter)




























//company routes
app.use("/api/company",companyRoutes)

















//job-listing  route
















app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})


