// controllers/userChat.js
const express = require("express");
const { chatModel } = require("../Model/chatSchema");
const { volunteerModel } = require("../Model/volenteerSchema");
const catchAsyncError = require("../middleware/catchAsyncError");
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/multer");
const fs = require("fs");

const chatRoute = express.Router();

const ALLOWED_MIME_TYPES = new Set([
  // images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  // audio
  "audio/webm",
  "audio/ogg",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/mp4",
]);

chatRoute.post(
  "/upload",
  auth,
  upload.single("file"),
  catchAsyncError(async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: false, message: "No file uploaded" });
    }

    if (!ALLOWED_MIME_TYPES.has(req.file.mimetype)) {
      try {
        await fs.promises.unlink(req.file.path);
      } catch {
        // ignore
      }
      return res
        .status(400)
        .json({ status: false, message: "Unsupported file type" });
    }

    const url = `/uploads/${req.file.filename}`;
    res.status(200).json({
      status: true,
      data: {
        url,
        mimeType: req.file.mimetype,
        originalName: req.file.originalname,
        size: req.file.size,
      },
    });
  })
);

// Get all volunteers (for sidebar)
chatRoute.get(
  "/volunteers",
  auth,
  catchAsyncError(async (req, res) => {
    const volunteers = await volunteerModel
      .find({ role: "volunteer", _id: { $ne: req.user_id } })
      .select("name _id");
    res.status(200).json({ status: true, data: volunteers });
  })
);

chatRoute.get(
  "/all",
  catchAsyncError(async (req, res) => {
    const volunteers = await volunteerModel
      .find({ role: "volunteer" })
      .select("name _id");
    res.status(200).json({ status: true, data: volunteers });
  })
);

chatRoute.get(
  "/history/:id",
  auth,
  catchAsyncError(async (req, res) => {
    const currentUserId = req.user_id;
    const otherUserId = req.params.id;

    const messages = await chatModel
      .find({
        $or: [
          { sender: currentUserId, receiver: otherUserId },
          { sender: otherUserId, receiver: currentUserId },
        ],
      })
      .sort({ timestamp: 1 });

    res.status(200).json({ status: true, messages });
  })
);

// (Optional) Save chat message - used only if you also want to store chat outside socket events
chatRoute.post(
  "/send",
  auth,
  catchAsyncError(async (req, res) => {
    const {
      toUserId,
      message,
      messageType,
      mediaUrl,
      mediaMimeType,
      mediaOriginalName,
    } = req.body;
    if (!toUserId) return res.status(400).json({ message: "Missing fields" });

    const normalizedType = ["text", "image", "audio"].includes(messageType)
      ? messageType
      : "text";

    if (normalizedType === "text" && !message) {
      return res.status(400).json({ message: "Missing message" });
    }

    if (normalizedType !== "text" && !mediaUrl) {
      return res.status(400).json({ message: "Missing mediaUrl" });
    }

    const newMessage = await chatModel.create({
      sender: req.user_id,
      receiver: toUserId,
      message: message || "",
      messageType: normalizedType,
      mediaUrl: mediaUrl || undefined,
      mediaMimeType: mediaMimeType || undefined,
      mediaOriginalName: mediaOriginalName || undefined,
    });

    res.status(200).json({ status: true, message: newMessage });
  })
);

chatRoute.get(
  "/users",
  auth,
  catchAsyncError(async (req, res) => {
    const volunteerId = req.user_id;

    const chats = await chatModel
      .find({
        $or: [{ sender: volunteerId }, { receiver: volunteerId }],
      })
      .select("sender receiver");

    const userIds = new Set();
    chats.forEach((chat) => {
      if (chat.sender.toString() !== volunteerId)
        userIds.add(chat.sender.toString());
      if (chat.receiver.toString() !== volunteerId)
        userIds.add(chat.receiver.toString());
    });

    const users = await volunteerModel
      .find({
        _id: { $in: Array.from(userIds) },
        role: "user", // 🎯 Only return users (not other volunteers)
      })
      .select("name _id");

    res.status(200).json({ status: true, data: users });
  })
);

module.exports = { chatRoute };
