import cvUsers from "../models/cvUserModel.js";

export async function createCvUserDetails(req,res){
    try {
        const newUserdetails = req.body;
        const user = new cvUsers(newUserdetails)
        await user.save();

        res.json({
            message : "user details saved successfully"
        })

    } catch (error) {
        res.json({
            message : "error to save user",
            error : error.message
        })
    }
}