import express from "express";
import { register, login, logout, getUser, updateProfile, deleteUser, getAllUsers, deleteUserByAdmin } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.route("/register").post(singleUpload, register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/currentuser").get(isAuthenticated, getUser);
userRouter.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
userRouter.route("/delete").delete(isAuthenticated, deleteUser);
userRouter.route("/getAllUsers").get(isAuthenticated, getAllUsers);
userRouter.route("/delete/:userId").delete(isAuthenticated, deleteUserByAdmin);

export default userRouter;
 
 
