import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:8080");

const ChatArea = ({ selectedChat }) => {
  const lightTheme = useSelector((state) => state.theme.light);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));

  // Fetch messages for the selected chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat || !selectedChat._id) {
        console.error("Invalid chat selected");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(
          `http://localhost:8080/message/${selectedChat._id}`,
          config
        );

        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  // Listen for real-time messages
  useEffect(() => {
    const handler = (msg) => {
      console.log("Message received on client:", msg);
      setMessages((prev) => [...prev, msg]);
    };
    socket.on("message received", handler);
    return () => socket.off("message received", handler);
  }, []);

  // Join the chat room when selectedChat changes
  useEffect(() => {
    if (selectedChat && selectedChat._id) {
      socket.emit("join chat", selectedChat._id);
    }
  }, [selectedChat]);

  // Connect event for socket.io
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected!", socket.id);
    });
    return () => socket.off("connect");
  }, []);

  // Setup socket on login
  useEffect(() => {
    if (user) {
      socket.emit("setup", user);
    }
  }, [user]);

  // Socket disconnect event
  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
    });
    return () => socket.off("disconnect");
  }, []);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      chatId: selectedChat._id,
      content: newMessage,
    };

    try {
      // 1. Save to DB via REST API
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:8080/message",
        messageData,
        config
      );

      // 2. Emit via socket.io for real-time
      socket.emit("new message", data); // ✅ match backend

      // 3. Update local state
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log("Selected Chat ID:", selectedChat?._id);
  return (
    <div className="h-full w-[63vw] sm:px-6 px-2 rounded-tr-2xl rounded-br-2xl py-5 flex flex-col gap-y-2">
      {/* Chat Header */}
      <div
        className={
          "sm:h-[8vh] h-[8vh] w-full flex items-center bg-[#E0DFD5] rounded-xl sm:px-9 px-2 pb-4 shade-g justify-between" +
          (lightTheme ? "" : " dark-theme")
        }
      >
        <div
          className={
            "flex text-stone-500 items-center pt-3 justify-between" +
            (lightTheme ? "" : " text-white")
          }
        >
          <div className={"" + (lightTheme ? "con-icon" : " con-icon-d")}>
            {selectedChat?.isGroupChat
              ? selectedChat.chatName[0]
              : selectedChat?.users.find((u) => u._id !== user._id)?.name[0]}
          </div>
          <div className="flex flex-col pl-2">
            <div>
              <p className="text-lg font-bold">
                {selectedChat?.isGroupChat
                  ? selectedChat.chatName
                  : selectedChat?.users.find((u) => u._id !== user._id)?.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        className={
          "h-[76vh] w-full flex flex-col justify-start bg-[#E0DFD5] rounded-xl px-8 my-2 overflow-y-scroll gap-y-2 shade-g" +
          (lightTheme ? "" : " dark-theme")
        }
      >
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages found for this chat.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender.name === user.name
                  ? "self-end bg-blue-500 text-white px-4 py-2 rounded-lg"
                  : "self-start bg-gray-300 text-black px-4 py-2 rounded-lg"
              }
            >
              <strong>{msg.sender.name}:</strong> {msg.content}
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div
        className={
          "h-[8vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-8 pb-0 mt-1 shade-g" +
          (lightTheme ? "" : " dark-theme")
        }
      >
        <input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={
            "pl-1 w-full h-6 bg-transparent border:none outline-none " +
            (lightTheme ? " text-gray-800" : " text-white")
          }
        />
        <IconButton onClick={sendMessage}>
          <SendIcon
            className={"scale-125" + (lightTheme ? "" : " text-white")}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatArea;

