import express from "express";
import { Student } from "../models/assignStudent.js";
import { Mentor } from "../models/assignMentor.js";

const studentRouter = express.Router();

//Find Student
studentRouter.get("/getStudent", async (request, response) => {
  const student = await Student.find();

  response.send(student);
});

//Create Student
studentRouter.post("/createStudent", async (request, response) => {
  const { name, email } = request.body;

  if ((!name, !email)) {
    return response.status(400).json({ error: "Field is empty!" });
  }

  try {
    const isExist = await Student.findOne({ email: email });

    if (isExist) {
      return response.status(400).json({ error: "Email already exists!" });
    }

    const student = new Student({ name, email });
    await student.save();

    response.status(200).json({ message: "Student created successfully!" });
  } catch (err) {
    response.send(err);
  }
});

//Update mentor
studentRouter.patch("/updateStudent", async (request, response) => {
  const { studentId, newMentorId } = request.body;

  if (!studentId || !newMentorId) {
    return response.status(400).json({ error: "Field is empty!" });
  }

  try {
    const MentorName = await Mentor.findOne({ _id: newMentorId });
    const StudentName = await Student.findOne({ _id: studentId });

    const oldMentor = StudentName.mentor.mentorId;

    await Mentor.updateOne(
      { _id: oldMentor },
      { $pull: { students: { studentId: studentId } } }
    );

    await Student.updateOne(
      { _id: studentId },
      {
        $set: {
          mentor: { mentorId: newMentorId, mentorName: MentorName.name },
        },
      }
    );

    await Mentor.updateOne(
      { _id: newMentorId },
      {
        $push: {
          students: { studentId: studentId, studentName: StudentName.name },
        },
      }
    );

    response.status(200).json({ message: "Mentor updated!" });
  } catch (err) {
    response.send(err);
  }
});

export { studentRouter };
