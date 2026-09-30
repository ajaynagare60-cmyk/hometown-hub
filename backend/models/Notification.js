const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    type: {
      type: String,
      enum: [
        "comment",
        "announcement",
        "community_approved",
        "event",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: false,
    },

    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: false,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);