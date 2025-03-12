import express from "express";
import { createCvUserDetails } from "../controllers/cvUserControllers.js";

const cvUserRoutes = express.Router()

cvUserRoutes.post("/",createCvUserDetails);


export default cvUserRoutes