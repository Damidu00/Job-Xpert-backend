import { User } from "../models/UserModel.js";



export const register = async (req,res) => {
    try {

        const {fist_name, last_name, email, password, telephone, role}=req.body;

        if(!fist_name || !last_name || !email|| !password|| !telephone|| !role) {
            return res.ststus(400).json({
                message:"Something is missing",
                success:false
            });
        };
        const file =req.file;
        const fileUri =getDatauri(file);
        const cloudRespone = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({email}); 
        if(user){
            return res.status(400).json({
                message:'User already exist with this email.',
                success:false,
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            fist_name,
            last_name, 
            email, 
            password : hashedPassword,
            telephone, 
            role,
            profile:{
                profilePhoto:cloudRespone.secure_url
            }
        });

        return res.status(201).json({
            message:'Account created Successfully. 👍',
            success:true
        });
   
    } catch (error) {
      console.log(error);  
    }
}
export const login = async (req,res)=>{
    try {

        const {email, password,role}=req.body;

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
        const token= await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});

        user ={
            _id:user._id,
            first_name:user.first_name,
            last_name:user.last_name,
            telephone:user.telephone,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.first_name}`,
            user,
            success: true
        })

        /*const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({
            message: `Welcome back ${user.first_name}`,
            token, // Send token in response
            user,
            success: true
        });*/

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
      
        // resume comes later here...
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