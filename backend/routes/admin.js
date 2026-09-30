const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Community = require("../models/Community");
const Post = require("../models/Post");
const Event = require("../models/Event");
const Pandit = require("../models/Pandit");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ==========================================
// ADMIN DASHBOARD STATISTICS
// GET /api/admin/stats
// ==========================================

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const users = await User.countDocuments();

      const communities = await Community.countDocuments();

      const posts = await Post.countDocuments();

      const events = await Event.countDocuments();

      res.status(200).json({
        users,
        communities,
        posts,
        events,
      });
    } catch (error) {
      console.error("Admin stats error:", error);

      res.status(500).json({
        message: "Server error while fetching admin statistics",
        error: error.message,
      });
    }
  }
);



// ==========================================
// GET PANDIT APPLICATIONS
// GET /api/admin/pandits
// ==========================================

router.get(
  "/pandits",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const applications = await Pandit.find()
        .populate("applicant", "name email")
        .sort({ createdAt: -1 });

      res.status(200).json(applications);

    } catch (error) {
      console.error("Get Pandit applications error:", error);

      res.status(500).json({
        message: "Server error while fetching Pandit applications",
        error: error.message,
      });
    }
  }
);




// ==========================================
// APPROVE PANDIT
// PUT /api/admin/pandits/:id/approve
// ==========================================

router.put(
  "/pandits/:id/approve",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const pandit = await Pandit.findById(req.params.id);

      if (!pandit) {
        return res.status(404).json({
          message: "Pandit application not found",
        });
      }

      pandit.status = "Approved";

      await pandit.save();

      res.status(200).json({
        message: "Pandit application approved",
        application: pandit,
      });

    } catch (error) {
      console.error("Approve Pandit error:", error);

      res.status(500).json({
        message: "Server error while approving Pandit",
        error: error.message,
      });
    }
  }
);



// ==========================================
// REJECT PANDIT
// PUT /api/admin/pandits/:id/reject
// ==========================================

router.put(
  "/pandits/:id/reject",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const pandit = await Pandit.findById(req.params.id);

      if (!pandit) {
        return res.status(404).json({
          message: "Pandit application not found",
        });
      }

      pandit.status = "Rejected";

      await pandit.save();

      res.status(200).json({
        message: "Pandit application rejected",
        application: pandit,
      });

    } catch (error) {
      console.error("Reject Pandit error:", error);

      res.status(500).json({
        message: "Server error while rejecting Pandit",
        error: error.message,
      });
    }
  }
);


module.exports = router;