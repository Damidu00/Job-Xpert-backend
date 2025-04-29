import express from "express";

userRouter.route("/register").post(singleUpload, register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/currentuser").get (isAuthenticated, getUser);
userRouter.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
userRouter.route("/delete").delete(isAuthenticated,deleteUser);
userRouter.route("/getAllUsers").get(isAuthenticated,getAllUsers)
userRouter.route("/delete/:userId").delete(isAuthenticated,deleteUserByAdmin);




userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/profile/update").post(isAuthenticated,updateProfile);



export default userRouter;
 
 
