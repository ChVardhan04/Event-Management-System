const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const Event = require("../models/Event");


router.post("/", async (req, res) => {
  const { name, timezone } = req.body;
  const profile = await Profile.create({ name, timezone });
  res.status(201).json(profile);
});


router.get("/", async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

router.put("/:id", async (req, res) => {
  const { name } = req.body;

  const profile = await Profile.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );

  if (!profile) {
    return res.status(404).json({ msg: "Profile not found" });
  }

  res.json(profile);
});


router.delete("/:id", async (req, res) => {
  await Profile.findByIdAndDelete(req.params.id);


  await Event.updateMany(
    {},
    { $pull: { profiles: req.params.id } }
  );

  res.json({ msg: "Profile deleted" });
});

module.exports = router;
