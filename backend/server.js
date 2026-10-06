const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const eventRoutes = require("./routes/event");
const notificationRoutes = require("./routes/notification");
const adminRoutes = require("./routes/admin");
const panditRoutes = require("./routes/pandit");
const moderatorRoutes = require("./routes/moderator");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pandits", panditRoutes);
app.use("/api/moderator", moderatorRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Hometown Hub Backend is running",
  });
});

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

startServer();