import bodyParser from 'body-parser';
import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import cors from 'cors'

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


app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})


