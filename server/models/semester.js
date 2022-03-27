const mongoose = require("mongoose");
const { courseSchema } = require("./course");
const User = require("./user");

const semesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courses: [
    {
      type: courseSchema,
    },
  ],
  credit: {
    type: Number,
  },
  gpa: {
    type: Number,
  },
});

const Semester = mongoose.model("Semester", semesterSchema);

exports.semesterSchema = semesterSchema;
exports.Semester = Semester;
