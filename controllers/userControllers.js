import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from '../utils/cloudinary.js'
import {createResponse} from "../utils/responseUtils.js";
import dotenv from 'dotenv';


dotenv.config();

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
    console.log(fullname, email, phoneNumber, password, role);
        

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
  console.log(file)
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
                
            })
            
        }
       
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


export const login = async (req,res)=>{
    try {

        const {email, password,role}=req.body;
  console.log({email, password,role})

        if(!email ||!password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success: false
            });
        };
        
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Incorrect email or password.",
                success:false,
            })
        };

        const isPasswordMath = await bcrypt.compare(password,user.password);
        if(!isPasswordMath){
            return res.status(400).json({
                message:"Incorrect email or password.",
                success: false,
            })
        };
        if (role !== user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role.",
                success:false,
            })
        };
        const tokenData = {
            userId:user._id
        }
        const token= await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

        var response = {
            access_token: token
        };

        user ={
            _id:user._id,
            fullname:user.fullname,
            telephone:user.telephone,
            role:user.role,
            profile:user.profile
        }
         
        return res.send(createResponse(response));
        

    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        console.log(fullname, email, phoneNumber, bio, skills );
        
 
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }

        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);
        
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        //resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();
       
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}











export async function getUser(req, res) {
    const authHeader = req.headers.authorization;
  
    // Check if Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }
  
    // Extract the token
    const token = authHeader.split(' ')[1];
  
    try {
      // Verify the token using the JWT_SECRET_KEY from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
      // Extract user ID from the token
      const userId = decoded.userId;
  
      // Query the database to find the user by ID
      const user = await User.findById(userId); // Replace with your database query
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user details
      res.json({
        userId: user._id,
        username: user.fullname,
        email: user.email,
      });
    } catch (error) {
      // Handle token verification errors (e.g., expired or invalid token)
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  }

 /* line 112 const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({
            message: `Welcome back ${user.first_name}`,
            token, // Send token in response
            user,
            success: true
        });*/