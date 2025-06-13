const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");
const { protect } = require("../middleware/auth");

// Send a message
router.post("/", protect, async (req, res) => {
  const { chatId, content } = req.body;
  if (!chatId || !content) {
    return res.status(400).json({ message: "Invalid data passed" });
  }
  try {
    const message = await Message.create({
      sender: req.user._id,
      chat: chatId,
      content,
    });
    res.status(201).json(message);
  } catch (error) {
    console.error("Failed to send message", error);
    res.status(500).json({ message: "Failed to send message", error });
  }
});

// Fetch messages for a chat
router.get("/:chatId", protect, async (req, res) => {
  const { chatId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(400).json({ error: "Invalid chat ID" });
  }
  const messages = await Message.find({ chat: new mongoose.Types.ObjectId(chatId) })
    .populate("sender", "name pic email")
    .populate("chat");
  res.json(messages);
});

// Mark all messages in a chat as read by the current user
router.post("/mark-read/:chatId", protect, async (req, res) => {
  const { chatId } = req.params;
  try {
    await Message.updateMany(
      {
        chat: chatId,
        readBy: { $ne: req.user._id },
        sender: { $ne: req.user._id }, // Don't mark your own messages as unread
      },
      { $addToSet: { readBy: req.user._id } }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark messages as read" });
  }
});

module.exports = router;