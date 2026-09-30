const express = require("express");
const router = express.Router();

const Pandit = require("../models/Pandit");
const authMiddleware = require("../middleware/authMiddleware");


// ==========================================
// PANDIT REGISTRATION
// POST /api/pandits
// ==========================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      mobileNumber,
      city,
      village,
      services,
      experience,
      availability,
    } = req.body;

    if (
      !name ||
      !mobileNumber ||
      !city ||
      !village ||
      !experience ||
      !availability
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    if (!services || services.length === 0) {
      return res.status(400).json({
        message: "Please select at least one service",
      });
    }

    const existingApplication = await Pandit.findOne({
      applicant: req.user.id || req.user._id,
      status: "Pending",
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You already have a pending application",
      });
    }

    const pandit = new Pandit({
      name,
      mobileNumber,
      city,
      village,
      services,
      experience,
      availability,
      applicant: req.user.id || req.user._id,
      status: "Pending",
    });

    const savedPandit = await pandit.save();

    res.status(201).json({
      message: "Pandit application submitted successfully",
      application: savedPandit,
    });

  } catch (error) {
    console.error("Pandit registration error:", error);

    res.status(500).json({
      message: "Server error while submitting application",
      error: error.message,
    });
  }
});


module.exports = router;
