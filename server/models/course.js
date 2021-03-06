const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  gradeLetter: {
    type: String,
    required: true,
  },
  gradePoint: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

exports.courseSchema = courseSchema;
exports.Course = Course;
