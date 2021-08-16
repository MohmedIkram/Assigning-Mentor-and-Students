import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mentorRouter } from "./routes/mentor.js";
import { studentRouter } from "./routes/student.js";

const app = express();
const PORT = 5000;

// Opened Connection to loacal DB
const url = "mongodb://localhost/AssignMentor";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => {
  console.log("Mongodb is connected");
});

// middleware
app.use(cors());
app.use(express.json());

app.use("/", mentorRouter);
app.use("/", studentRouter);

app.use("/", async (request, response) => {
  response.send("hello hi");
});

app.listen(PORT, () => console.log("server is started"));
