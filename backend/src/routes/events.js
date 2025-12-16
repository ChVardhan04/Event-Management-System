const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const tz = require("dayjs/plugin/timezone");

const Event = require("../models/Event");
const EventLog = require("../models/EventLog");

dayjs.extend(utc);
dayjs.extend(tz);


const toUtc = (local, timezone) =>
  dayjs.tz(local, timezone).utc().toDate();

const diffEvent = (before, after) => {
  const changes = {};

  if (before.timezone !== after.timezone) {
    changes.timezone = {
      before: before.timezone,
      after: after.timezone,
    };
  }

  if (before.startUtc.toISOString() !== after.startUtc.toISOString()) {
    changes.start = {
      before: before.startUtc,
      after: after.startUtc,
    };
  }

  if (before.endUtc.toISOString() !== after.endUtc.toISOString()) {
    changes.end = {
      before: before.endUtc,
      after: after.endUtc,
    };
  }

  return changes;
};


router.post("/", async (req, res) => {
  try {
    const { profileIds, timezone, startLocal, endLocal } = req.body;

    const startUtc = toUtc(startLocal, timezone);
    const endUtc = toUtc(endLocal, timezone);

    if (endUtc <= startUtc) {
      return res.status(400).json({ msg: "End must be after start" });
    }

    const now = new Date();

    const event = await Event.create({
      profiles: profileIds,
      timezone,
      startUtc,
      endUtc,
      createdAtUtc: now,
      updatedAtUtc: now,
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const { profileId } = req.query;

    const events = await Event.find({ profiles: profileId })
      .populate("profiles", "name")
      .lean();

    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { profileIds, timezone, startLocal, endLocal } = req.body;
    const id = req.params.id;

    const oldEvent = await Event.findById(id);
    if (!oldEvent) {
      return res.status(404).json({ msg: "Event not found" });
    }

    const startUtc = toUtc(startLocal, timezone);
    const endUtc = toUtc(endLocal, timezone);

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        profiles: profileIds,
        timezone,
        startUtc,
        endUtc,
        updatedAtUtc: new Date(),
      },
      { new: true }
    );

    const changes = diffEvent(oldEvent, updatedEvent);

    if (Object.keys(changes).length > 0) {
      await EventLog.create({
        eventId: id,
        changes,
        createdAtUtc: new Date(),
      });
    }

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    await EventLog.deleteMany({ eventId: req.params.id });

    res.json({ msg: "Event deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.get("/:id/logs", async (req, res) => {
  try {
    const logs = await EventLog.find({ eventId: req.params.id })
      .sort({ createdAtUtc: -1 })
      .lean();

    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
