import Skills from "../models/skillsModel.js"

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

export async function getSkills(req,res){
    const userId = req.params.userId
    try {
        const skills = await Skills.findOne({userId : userId})
        res.json(skills)
    } catch (error) {
        res.status(500).json({
            message : "error to fetch users",
            error : error.message
        })
    }
}

