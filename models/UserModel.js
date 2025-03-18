import mongoose from "mongoose";

const userSchema =  mongoose.Schema ({

    userId: {
        type : String,
        required: true
      },
    fist_name: {
        type : String,
        required: true
      },
    last_name: {
        type : String,
        required: true
      },
    email: {
        type : String,
        required: true,
        unique: true,
      },
    password: {
        type : String,
        required: true
      },
    telephone: {
        type : Number,
        required: true
      },
    role: {
        type : String,
        enum:['admin','user','company'],
        required: true
      },
    profile:{
      bio:{type:String},
      skills:[{type:String}],
      resume:{type:String}, // URL to resume file
      resumeOriginalName:{type:String},
      company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
      profilePhoto:{
          type:String,
          default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      }
    },
      
      
});
export const User = mongoose.model('user',userSchema);