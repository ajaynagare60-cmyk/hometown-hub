const express = require("express");

const Post = require("../models/Post");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// CREATE POST
// POST /api/posts
// =====================================================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      content,
      type,
      image
    } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Post content is required"
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "User authentication information missing"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const allowedTypes = [
      "General",
      "Announcement",
      "Local News",
      "Culture",
      "Help",
      "Event"
    ];

    const postType = type || "General";

    if (!allowedTypes.includes(postType)) {
      return res.status(400).json({
        message: "Invalid post type"
      });
    }

    const post = new Post({
      author: user._id,
      content: content.trim(),
      type: postType,
      image: image || "",
      likes: [],
      comments: []
    });

    await post.save();

    const createdPost = await Post.findById(post._id)
      .populate("author", "name email")
      .populate("comments.user", "name email");

    res.status(201).json(createdPost);

  } catch (error) {
    console.error("Create post error:", error);

    res.status(500).json({
      message: "Server error while creating post",
      error: error.message
    });
  }
});


// =====================================================
// GET ALL POSTS
// GET /api/posts
// =====================================================

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .populate("comments.user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {
    console.error("Get posts error:", error);

    res.status(500).json({
      message: "Server error while fetching posts",
      error: error.message
    });
  }
});


// =====================================================
// GET SINGLE POST
// GET /api/posts/:id
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email")
      .populate("comments.user", "name email");

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.status(200).json(post);

  } catch (error) {
    console.error("Get single post error:", error);

    res.status(500).json({
      message: "Server error while fetching post",
      error: error.message
    });
  }
});


// =====================================================
// LIKE / UNLIKE POST
// PUT /api/posts/:id/like
// =====================================================

router.put("/:id/like", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    // Get logged-in user's ID
    const userId = req.user.id || req.user._id;

    if (!userId) {
      return res.status(401).json({
        message: "User authentication information missing"
      });
    }

    // Check whether user already liked this post
    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyLiked) {
      // Remove like
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // Add like
      post.likes.push(userId);
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("author", "name email")
      .populate("comments.user", "name email");

    res.status(200).json(updatedPost);

  } catch (error) {
    console.error("Like post error:", error);

    res.status(500).json({
      message: "Server error while liking post",
      error: error.message
    });
  }
});


// =====================================================
// ADD COMMENT
// POST /api/posts/:id/comment
// =====================================================

router.post("/:id/comment", authMiddleware, async (req, res) => {
  try {
    const {
      text
    } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment text is required"
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "User authentication information missing"
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    post.comments.push({
      user: req.user.id,
      text: text.trim()
    });

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("author", "name email")
      .populate("comments.user", "name email");

    res.status(200).json(updatedPost);

  } catch (error) {
    console.error("Comment error:", error);

    res.status(500).json({
      message: "Server error while commenting",
      error: error.message
    });
  }
});


// =====================================================
// DELETE OWN POST
// DELETE /api/posts/:id
// =====================================================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "User authentication information missing"
      });
    }

    // Only the post owner can delete it
    if (
      post.author.toString() !==
      req.user.id.toString()
    ) {
      return res.status(403).json({
        message: "You can delete only your own post"
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Post deleted successfully"
    });

  } catch (error) {
    console.error("Delete post error:", error);

    res.status(500).json({
      message: "Server error while deleting post",
      error: error.message
    });
  }
});


module.exports = router;