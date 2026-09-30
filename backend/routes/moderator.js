const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");
const Event = require("../models/Event");
const Comment = require("../models/Comment");

const authMiddleware = require("../middleware/authMiddleware");
const moderatorMiddleware = require("../middleware/moderatorMiddleware");

// ==========================================
// MODERATOR DASHBOARD STATISTICS
// GET /api/moderator/stats
// ==========================================

router.get(
  "/stats",
  authMiddleware,
  moderatorMiddleware,
  async (req, res) => {
    try {
      const pendingMembers = await User.countDocuments({
        status: "pending",
      });

      const reportedPosts = await Post.countDocuments({
        reported: true,
      });

      const reportedComments = 0;

      const upcomingEvents = await Event.countDocuments({
        date: {
          $gte: new Date(),
        },
      });

        console.log("MODERATOR STATS:");
        console.log("Pending Members:", pendingMembers);
        console.log("Reported Posts:", reportedPosts);
        console.log("Reported Comments:", reportedComments);
        console.log("Upcoming Events:", upcomingEvents);

      res.status(200).json({
        pendingMembers,
        reportedPosts,
        reportedComments,
        upcomingEvents,
      });

    } catch (error) {
      console.error(
        "Moderator stats error:",
        error
      );

      res.status(500).json({
        message: "Server error while fetching moderator statistics",
        error: error.message,
      });
    }
  }
);

// ==========================================
// GET PENDING MEMBERS
// GET /api/moderator/members/pending
// ==========================================

router.get(
  "/members/pending",
  authMiddleware,
  moderatorMiddleware,
  async (req, res) => {
    try {
      const members = await User.find({
        status: "pending",
      }).select("-password");

      res.status(200).json(members);

    } catch (error) {
      console.error(
        "Pending members error:",
        error
      );

      res.status(500).json({
        message: "Server error while fetching members",
      });
    }
  }
);

// ==========================================
// APPROVE MEMBER
// PUT /api/moderator/members/:id/approve
// ==========================================

router.put(
  "/members/:id/approve",
  authMiddleware,
  moderatorMiddleware,
  async (req, res) => {
    try {
      const member = await User.findById(
        req.params.id
      );

      if (!member) {
        return res.status(404).json({
          message: "Member not found",
        });
      }

      member.status = "approved";

      await member.save();

      res.status(200).json({
        message: "Member approved successfully",
        member,
      });

    } catch (error) {
      console.error(
        "Approve member error:",
        error
      );

      res.status(500).json({
        message: "Server error while approving member",
      });
    }
  }
);

// ==========================================
// REMOVE POST
// DELETE /api/moderator/posts/:id
// ==========================================

router.delete(
  "/posts/:id",
  authMiddleware,
  moderatorMiddleware,
  async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(
        req.params.id
      );

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      res.status(200).json({
        message: "Post removed successfully",
      });

    } catch (error) {
      console.error(
        "Remove post error:",
        error
      );

      res.status(500).json({
        message: "Server error while removing post",
      });
    }
  }
);


// ==========================================
// PIN / UNPIN POST
// PUT /api/moderator/posts/:id/pin
// ==========================================

router.put(
  "/posts/:id/pin",
  authMiddleware,
  moderatorMiddleware,
  async (req, res) => {
    try {
      const post = await Post.findById(
        req.params.id
      );

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      post.isPinned = !post.isPinned;

      await post.save();

      res.status(200).json({
        message: post.isPinned
          ? "Post pinned successfully"
          : "Post unpinned successfully",

        post,
      });

    } catch (error) {
      console.error(
        "Pin post error:",
        error
      );

      res.status(500).json({
        message: "Server error while pinning post",
      });
    }
  }
);






module.exports = router;