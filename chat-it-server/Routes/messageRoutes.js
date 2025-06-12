const express = require("express");
const { protect } = require("../middleware/auth");
const Message = require("../models/messageModel");

const router = express.Router();

// Send a message
router.post("/", protect, async (req, res) => {
  const { chatId, content } = req.body;

  if (!content || !chatId) {
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
    res.status(500).json({ message: "Failed to send message", error });
  }
});

// Fetch messages for a chat
router.get("/:chatId", protect, async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
});

module.exports = router;