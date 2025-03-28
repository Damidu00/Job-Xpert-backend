import express from "express";
import { getAllUsers, getUser, login, logout, register, updateProfile, } from "../controllers/userControllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import { deleteUser } from "../controllers/userControllers.js";
const userRouter = express.Router();

userRouter.route("/register").post(singleUpload, register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/currentuser").get (isAuthenticated, getUser);
userRouter.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
userRouter.route("/delete").delete(isAuthenticated,deleteUser);
userRouter.route("/getAllUsers").get(isAuthenticated,getAllUsers)



export default userRouter;
 
 
