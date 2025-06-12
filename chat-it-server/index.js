const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const http = require("http");
const { Server } = require("socket.io");

const { default : mongoose } = require('mongoose');

const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());

app.get("/", (req,res) => {
    res.send("API is running...");
});

const messageRoutes =  require("./Routes/messageRoutes")
app.use("/messages", messageRoutes);

const chatRoutes = require("./Routes/chatRoutes");
app.use("/chat", chatRoutes);

console.log(process.env.MONGO_URI)

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log('Server is connected to DB')
    }
    catch (err) {
        console.log('Server is not connected to DB', err.message);
    }
    
};
connectDb();

app.use("/user", userRoutes);

// Sanitize inputs
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Secure HTTP headers
app.use(helmet());

const { errorHandler } = require('./Middleware/errorMiddleware');
app.use(errorHandler);

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"], // Allow multiple origins
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle joining a chat
  socket.on("joinChat", (chatId) => {
    if (!chatId) {
      console.error("Invalid chatId received in joinChat event");
      return;
    }
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  // Handle sending a message
  socket.on("sendMessage", (messageData) => {
    const { chatId, content } = messageData;

    if (!chatId || !content) {
      console.error("Invalid message data received in sendMessage event");
      return;
    }

    // Emit the message to all users in the chat room
    io.to(chatId).emit("receiveMessage", messageData);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

