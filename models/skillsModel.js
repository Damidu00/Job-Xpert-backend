import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
    userId: {
      ref: 'User',
      required: true
    },
    skills: [
      {
        category: { type: String, required: true },
        items: { type: [String], required: true }
      }
    ]
  });
const Skills = mongoose.model("skills",skillSchema)
export default Skills