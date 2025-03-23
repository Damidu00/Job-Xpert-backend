import mongoose from "mongoose";

const cvuserSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cvId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        
    },
    phone: {
        type: String,
        required: true,
        match: /^\+?[0-9]{10,15}$/
    },
    profilePhoto: {
        type: String,
        default: "https://www.transparentpng.com/thumb/user/blak-frame-user-profile-png-icon--cupR3D.png"
    },
    linkedinURL: {
        type: String,
        default: "",
        trim: true,

    },
    githubURL: {
        type: String,
        default: "",
        trim: true,

    },
    Address: {
        type: String,
        required: true,
        trim: true
    },
    shortBio: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    }
});

const cvUsers = mongoose.model("cvUserDetails", cvuserSchema);
export default cvUsers;
