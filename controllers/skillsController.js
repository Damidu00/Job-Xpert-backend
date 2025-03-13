import Skills from "../models/skillsModel"

export async function createSkills(req,res){
    try {
        const skillDetails = req.body
        const skills = new Skills(skillDetails)
        await skills.save();

        res.status(200).json({
            message : "skills uploaded"
        })
    } catch (error) {
        res.status(500).json({
            message : "error to create skills",
            error: error.message
        })
    }
}