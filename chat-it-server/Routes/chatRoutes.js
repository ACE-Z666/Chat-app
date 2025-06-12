const express = require("express");
const { protect } = require("../middleware/auth");
const Chat = require("../models/chatModel");

const router = express.Router();

// Create a group chat
router.post("/group", protect, async (req, res) => {
  const { chatName, users } = req.body;

  if (!chatName || !users) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const groupChat = await Chat.create({
    chatName,
    isGroupChat: true,
    users: [...users, req.user._id],
    groupAdmin: req.user._id,
  });

  res.status(201).json(groupChat);
});

// Create or fetch a one-on-one chat
router.post("/", protect, async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Check if a chat already exists
    let chat = await Chat.findOne({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    }).populate("users", "-password");

    if (!chat) {
      // Create a new chat if it doesn't exist
      chat = await Chat.create({
        chatName: "One-on-One Chat",
        isGroupChat: false,
        users: [req.user._id, userId],
      });

      chat = await chat.populate("users", "-password").execPopulate();
    }

    res.status(200).json(chat);
  } catch (error) {
     console.error("Error creating or fetching chat:", error);
    res.status(500).json({ message: "Failed to create or fetch chat", error });
  }
});

// Fetch all chats for the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats", error });
  }
});

module.exports = router;