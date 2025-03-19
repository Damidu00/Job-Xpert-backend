import {Company} from "../models/companyModel.js";

//create company
export const registerCompany = async (req,res) =>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json ({
                message:"Company name is required. ",
                success: false
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"You can't register same company.",
                success:false
            })
        };
        company = await Company.create ({
            name:companyName,
            userId:req.id
        });

        return res.status(201).json({
            message:"company registered succesfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//read company
export const getCompany = async (req,res) => {
    try {
        const userId = req.id; //logged in user id
        const companies = await Company.find({userId});
        if(!companies) {
            return res.status(404).json({
                message:"companies not found.",
                success:false
            })
        }
        return res.status(200).json({
            companies,
        })
    } catch (error) {
        console.log(error);
        success:true
    }
}

//get company by id
export const getCompanyById = async (req,res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"companies not found.",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//update company
export const getupdateCompany = async (req,res) =>{
    try {
        const {name, description, website, location} = req.body;
        const file = req.file;

        const updateData = {name, description, website, location};
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});

        if(!company){
            return res.status(404).json({
                message:"companies not found.",
                success:false
            })
        }

        return res.status(200).json({
            message:"Company information update.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//delete company 
export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findByIdAndDelete(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while deleting the company.",
            success: false
        });
    }
};
