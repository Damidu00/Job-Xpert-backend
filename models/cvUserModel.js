import mongoose from "mongoose";

const cvuserSchema = mongoose.Schema({

    userId : {
        type : String,
        required : true
    },
    cvId : {
        type : String,
        required : true
    },
    firstName: {
        type: String,
        required: true, 
        trim: true
    },
    lastName: {
        type : String,
        required : true,
        trim : true
    },
    email: {
        type: String,
        required: true, 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'], 
        trim: true
    },
    phone: {
        type: String,
        required: true, 
        match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid phone number.'] 
    },
    profilePhoto: {
        type: String,
        default: "https://www.transparentpng.com/thumb/user/blak-frame-user-profile-png-icon--cupR3D.png"
    },
    linkedinURL: {
        type: String,
        default: "",
        trim: true
    },
    githubURL: {
        type: String,
        default: "",
        trim: true
    },
    Address: {
        type: String,
        required: true,
        trim: true
    },
    shortBio: {
        type: String,
        required: true,
        trim: true
    },
})

const cvUserModel = mongoose.model("cvUserDetails",cvuserSchema)
export default cvUserModel