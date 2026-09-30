const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const Community = require("../models/Community");

const authMiddleware = require("../middleware/authMiddleware");


// ==========================================
// CREATE EVENT
// POST /api/events
// ==========================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      description,
      date,
      time,
      location,
      community,
    } = req.body;

    if (
      !name ||
      !description ||
      !date ||
      !time ||
      !location
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const event = new Event({
      name,
      description,
      date,
      time,
      location,
      community: community || null,
      createdBy: req.user.id || req.user._id,
    });

    const savedEvent = await event.save();

    const populatedEvent = await Event.findById(savedEvent._id)
      .populate("createdBy", "name email")
      .populate("community", "name")
      .populate("interestedUsers", "name");

    res.status(201).json(populatedEvent);

  } catch (error) {
    console.error("Create event error:", error);

    res.status(500).json({
      message: "Server error while creating event",
      error: error.message,
    });
  }
});


// ==========================================
// GET ALL EVENTS
// GET /api/events
// ==========================================

router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .populate("community", "name")
      .populate("interestedUsers", "name")
      .sort({ date: 1 });

    res.status(200).json(events);

  } catch (error) {
    console.error("Get events error:", error);

    res.status(500).json({
      message: "Server error while fetching events",
      error: error.message,
    });
  }
});




// ==========================================
// JOIN EVENT
// PUT /api/events/:id/join
// ==========================================

router.put("/:id/join", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const userId = req.user.id || req.user._id;

    const alreadyJoined = event.interestedUsers.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyJoined) {
      event.interestedUsers = event.interestedUsers.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      event.interestedUsers.push(userId);
    }

    await event.save();

    const updatedEvent = await Event.findById(event._id)
      .populate("createdBy", "name email")
      .populate("community", "name")
      .populate("interestedUsers", "name");

    res.status(200).json(updatedEvent);

  } catch (error) {
    console.error("Join event error:", error);

    res.status(500).json({
      message: "Server error while joining event",
      error: error.message,
    });
  }
});



module.exports = router;   
