import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";

            }
        }


        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)) ) {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        res.cookie("token", token, { maxAge: 86400000, httpOnly: true });

        return res.json(createResponse({
            access_token: token,
            user: { _id: user._id, fullname: user.fullname, email: user.email, phoneNumber: user.phoneNumber, role: user.role, profile: user.profile }
        }));
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;


export const getUser = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }


        return res.json({ _id: user._id, fullname: user.fullname, email: user.email, phoneNumber: user.phoneNumber, role: user.role, profile: user.profile });
    } catch (error) {
        console.error("Get User Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }


        // Delete resume from Cloudinary if it exists
        if (user.profile.resume) {
            try {
                const publicId = user.profile.resume.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
            } catch (error) {
                console.error("Error deleting resume from Cloudinary:", error);
            }
        }


        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error) {
        console.error("Delete User By Admin Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
