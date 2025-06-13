const express = require("express");
const { protect } = require("../middleware/auth");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

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

// Get users with whom the current user has at least one message exchanged
router.get("/active-users", protect, async (req, res) => {
  try {
    // Find all chats the user is part of
    const chats = await Chat.find({ users: req.user._id, isGroupChat: false });

    // Get chat IDs
    const chatIds = chats.map((chat) => chat._id);

    // Find all messages in those chats
    const messages = await Message.find({ chat: { $in: chatIds } });

    // Get chat IDs that have at least one message
    const activeChatIds = [...new Set(messages.map((msg) => msg.chat.toString()))];

    // Get the other user in each active chat and count unread messages
    const activeUsers = [];
    for (const chatId of activeChatIds) {
      const chat = chats.find((c) => c._id.toString() === chatId);
      if (chat) {
        const otherUserId = chat.users.find((u) => u.toString() !== req.user._id.toString());
        if (otherUserId) {
          const user = await User.findById(otherUserId).select("-password");
          if (user) {
            // Count unread messages (not sent by current user)
            const unreadCount = await Message.countDocuments({
              chat: chatId,
              sender: { $ne: req.user._id },
              readBy: { $ne: req.user._id },
            });
            activeUsers.push({ ...user.toObject(), unreadCount, chatId });
          }
        }
      }
    }

    res.json(activeUsers);
  } catch (error) {
    console.error("Failed to fetch active users:", error);
    res.status(500).json({ message: "Failed to fetch active users" });
  }
});

// Get groups with unread messages for the current user
router.get("/active-groups", protect, async (req, res) => {
  try {
    // Find all group chats the user is part of
    const groupChats = await Chat.find({ users: req.user._id, isGroupChat: true });

    // For each group, count unread messages for the user
    const activeGroups = await Promise.all(
      groupChats.map(async (chat) => {
        const unreadCount = await Message.countDocuments({
          chat: chat._id,
          sender: { $ne: req.user._id },
          readBy: { $ne: req.user._id },
        });
        return {
          _id: chat._id,
          chatName: chat.chatName,
          unreadCount,
        };
      })
    );

    res.json(activeGroups);
  } catch (error) {
    console.error("Failed to fetch active groups:", error);
    res.status(500).json({ message: "Failed to fetch active groups" });
  }
});

// Get a single chat by ID (group or one-on-one)
router.get("/:id", protect, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name email" }
      });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Optional: Check if the requesting user is a member of this chat
    if (!chat.users.some(u => u._id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: "Not authorized for this chat" });
    }

    res.json(chat);
  } catch (error) {
    console.error("Failed to fetch chat by ID:", error);
    res.status(500).json({ message: "Failed to fetch chat" });
  }
});

module.exports = router;