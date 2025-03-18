import express from "express";
import { login, logout, register, updateProfile } from "../controllers/userControllers.js";



const userRouter =express.Router();

userRouter.route("register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/profile/update").post(updateProfile);

export default  userRouter 