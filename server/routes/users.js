const { User, validate } = require("../models/user");
const { Semester } = require("../models/semester");
const express = require("express");
const router = express.Router();

router.get("/info/:username", async (req, res) => {
  const userInfo = await User.findById({ _id: req.params.username });
  res.send(userInfo);
});
router.get("/:username/:password", async (req, res) => {
  const username = await User.find({ username: req.params.username });
  if (username.length < 1) res.send("no user found");
  const password = await User.find({ password: req.params.password });
  if (password.length < 1) res.send("Incorrect password");

  const userinfo = await User.find({
    username: req.params.username,
    password: req.params.password,
  });

  res.send(userinfo[0]._id);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  console.log(error);
  if (error)
    return res.send({ status: false, message: error.details[0].message });

  const username = await User.find({ username: req.body.username });
  if (username.length > 0)
    return res.send({ status: false, message: "Username Not Available" });

  let user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  user = await user.save();

  res.send({ status: true, message: user._id });
});

router.put("/name/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});
router.put("/username/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});
router.put("/password/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: req.body.password,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});
router.put("/email/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      email: req.body.email,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-__v");

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

module.exports = router;
