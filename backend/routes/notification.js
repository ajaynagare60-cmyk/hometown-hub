const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/authMiddleware");


// ==========================================
// GET MY NOTIFICATIONS
// GET /api/notifications
// ==========================================

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const notifications = await Notification.find({
      recipient: userId,
    })
      .populate("sender", "name")
      .populate("post", "content")
      .populate("community", "name")
      .populate("event", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);

  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      message: "Server error while fetching notifications",
      error: error.message,
    });
  }
});


// ==========================================
// MARK NOTIFICATION AS READ
// PUT /api/notifications/:id/read
// ==========================================

router.put("/:id/read", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const notification = await Notification.findOne({
      _id: req.params.id,
      recipient: userId,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json(notification);

  } catch (error) {
    console.error("Mark notification read error:", error);

    res.status(500).json({
      message: "Server error while updating notification",
      error: error.message,
    });
  }
});


// ==========================================
// DELETE NOTIFICATION
// DELETE /api/notifications/:id
// ==========================================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: userId,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
    });

  } catch (error) {
    console.error("Delete notification error:", error);

    res.status(500).json({
      message: "Server error while deleting notification",
      error: error.message,
    });
  }
});


module.exports = router;