import express from "express";
import { createCvUserDetails } from "../controllers/cvUserControllers";

const cvUserRoutes = express.Router()

cvUserRoutes.post("/",createCvUserDetails);


export default cvUserRoutes