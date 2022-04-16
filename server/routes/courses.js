const { Course } = require("../models/course");
const { Semester } = require("../models/semester");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find().select("-__v").sort("name");
  res.send(courses);
});
router.get("/:id", async (req, res) => {
  const courses = await Course.find({ user: req.params.id, isActive: true });
  res.send(courses);
});

router.get("/singlecourse/:id", async (req, res) => {
  const courses = await Course.findById(req.params.id);
  res.send(courses);
});
router.get("/semesterCourses/:id/:userid", async (req, res) => {
  const courses = await Course.find({
    semester: req.params.id,
    user: req.params.userid,
  });
  res.send(courses);
});
router.post("/edit/:id", async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      credit: req.body.credit,
      gradeLetter: req.body.gradeLetter,
      gradePoint: req.body.gradePoint,
      isActive: req.body.active,
    },
    {
      new: true,
    }
  );
  res.send(course);
});
router.post("/", async (req, res) => {
  const semesterId = req.body.semester;
  let course = new Course({
    user: req.body.user,
    semester: req.body.semester,
    name: req.body.name,
    credit: req.body.credit,
    gradeLetter: req.body.gradeLetter,
    gradePoint: req.body.gradePoint,
    isActive: true,
  });
  course = await course.save();
  await Semester.findByIdAndUpdate(semesterId, { $push: { courses: course } });
  res.send(course);
});

router.put("/:id", async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { isActive: req.body.active },
    {
      new: true,
    }
  );

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});
router.delete("/semesterCourses/:id", async (req, res) => {
  const course = await Course.deleteMany({ semester: req.params.id });

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

router.delete("/:id/:semesterId", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);
  const semester = await Semester.findById(req.params.semesterId);
  const courses = semester.courses.id(req.params.id);
  courses.remove();
  semester.save();

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id).select("-__v");

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

module.exports = router;
