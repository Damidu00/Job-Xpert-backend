import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
        
    },
    website:{
        type:String,
        
    },
    location:{
        type:String,
        
    },
    logo:{
        tyep:String
    },
    userId:{
        type:String,
        
        // type:mongoose.Schema.Types.ObjectId,     //must undo this after create userId token......
        // ref:'User',
        // required:true
    }


},{timestamps:true});
export const Company = mongoose.model("Company", companySchema);