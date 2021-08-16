import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  students: [
    {
      studentId: { type: String },
      studentName: { type: String },
    },
  ],
});

export const Mentor = mongoose.model("Mentor", mentorSchema);
