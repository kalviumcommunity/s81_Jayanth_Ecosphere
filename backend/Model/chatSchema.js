const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "volunteer",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "volunteer",
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  messageType: {
    type: String,
    enum: ["text", "image", "audio"],
    default: "text",
    index: true,
  },
  mediaUrl: {
    type: String,
  },
  mediaMimeType: {
    type: String,
  },
  mediaOriginalName: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatModel = mongoose.model("chat", chatSchema);

module.exports = { chatModel };
