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

export async function getcvUsers(req,res){
    const userId = req.params.userId
    try {
        const cvUser = await cvUsers.findOne({userId : userId})

        res.json(cvUser)
    } catch (error) {
        res.json({
            message : "cannot find the user"
        })
    }
}