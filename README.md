# Chat-app 💬

A modern, real-time chat application built with the MERN stack, enabling seamless communication with an intuitive interface and instant messaging capabilities.

---

## 🚀 About

Chat-app is a full-stack real-time messaging application that allows users to communicate instantly. Built with modern web technologies, it provides a smooth and responsive chat experience with features like user authentication, real-time message delivery, and a clean, intuitive interface.

---

## ✨ Features

- 🔐 **User Authentication** - Secure signup and login system
- 💬 **Real-time Messaging** - Instant message delivery using WebSocket technology
- 👥 **User Management** - Create and manage user profiles
- 🔔 **Message Notifications** - Real-time notifications for new messages
- 📱 **Responsive Design** - Seamless experience across all devices
- 🎨 **Modern UI** - Clean and intuitive user interface
- ⚡ **Fast Performance** - Optimized for speed and efficiency

---

## 🛠️ Tech Stack

### Frontend (chat-it-client)
- **React.js** - UI library for building interactive interfaces
- **Vite** - Fast build tool and development server
- **CSS** - Styling and responsive design
- **Socket.io Client** - Real-time bidirectional communication

### Backend (chat-it-server)
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Socket.io** - Real-time WebSocket communication
- **JWT** - Secure authentication and authorization

---

## 📂 Project Structure

```
Chat-app/
├── chat-it-client/          # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── utils/           # Helper functions
│   │   └── App.jsx          # Main app component
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── chat-it-server/          # Backend Node.js application
│   ├── controllers/         # Request handlers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration files
│   └── server.js            # Entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v16.0 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ACE-Z666/Chat-app.git
cd Chat-app
```

2. **Setup Backend**
```bash
cd chat-it-server
npm install
```

Create a `.env` file in the `chat-it-server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend server:
```bash
npm start
```

3. **Setup Frontend**
```bash
cd ../chat-it-client
npm install
```

Create a `.env` file in the `chat-it-client` directory:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

The application should now be running at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 💻 Usage

1. **Register a new account** - Create your user profile with username and password
2. **Login** - Sign in with your credentials
3. **Start chatting** - Select a user and begin sending messages in real-time
4. **Receive messages** - Get instant notifications when new messages arrive
5. **Manage profile** - Update your profile information as needed

---

## 🔧 Configuration

### Backend Configuration

**Server Settings** (`chat-it-server/config/server.js`):
```javascript
module.exports = {
  port: process.env.PORT || 5000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  jwtExpiry: '7d'
};
```

**Socket.io Configuration** (`chat-it-server/socket/index.js`):
```javascript
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-room', (userId) => {
    socket.join(userId);
  });
  
  socket.on('send-message', (message) => {
    io.to(message.recipientId).emit('receive-message', message);
  });
});
```

### Frontend Configuration

**API Service** (`chat-it-client/src/services/api.js`):
```javascript
const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

---

## 🧪 Testing

### Run Backend Tests
```bash
cd chat-it-server
npm test
```

### Run Frontend Tests
```bash
cd chat-it-client
npm test
```

---

## 📦 Deployment

### Deploy Backend (Heroku/Render)

1. **Prepare for deployment**
```bash
cd chat-it-server
```

2. **Create Procfile**
```
web: node server.js
```

3. **Deploy to Heroku**
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Deploy Frontend (Vercel)

1. **Build the application**
```bash
cd chat-it-client
npm run build
```

2. **Deploy to Vercel**
```bash
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

---

## 🔐 Security

### Implemented Security Features

- 🔒 **JWT Authentication** - Secure token-based authentication
- 🛡️ **Password Hashing** - Bcrypt for password encryption
- 🚫 **Input Validation** - Server-side validation for all inputs
- 🌐 **CORS Protection** - Configured CORS for secure communication
- 🔑 **Environment Variables** - Sensitive data stored securely
- 🚦 **Rate Limiting** - Protection against brute force attacks

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Cannot connect to MongoDB**
```bash
# Solution: Check your MONGODB_URI in .env
# Ensure MongoDB is running (local) or accessible (cloud)
```

**Issue: Socket.io connection failed**
```bash
# Solution: Verify VITE_SOCKET_URL matches your backend URL
# Check CORS settings in server configuration
```

**Issue: JWT token expired**
```bash
# Solution: Login again to get a new token
# Adjust JWT expiry time in backend configuration
```

**Issue: Frontend not loading**
```bash
# Solution: Clear browser cache and restart dev server
npm run dev -- --force
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 🗺️ Roadmap

### Upcoming Features

- [ ] Group chat functionality
- [ ] File and image sharing
- [ ] Message read receipts
- [ ] Typing indicators
- [ ] User status (online/offline)
- [ ] Message search functionality
- [ ] Dark mode theme
- [ ] Voice messages
- [ ] Video calling integration
- [ ] Message reactions and emojis

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Abhijith J Nair**

- GitHub: [@ACE-Z666](https://github.com/ACE-Z666)
- Project: [Chat-app](https://github.com/ACE-Z666/Chat-app)

---

## 🙏 Acknowledgments

- Socket.io for real-time communication
- MongoDB for flexible data storage
- React community for excellent documentation
- Vercel for seamless deployment

---

## 📞 Support

If you encounter any issues or have questions:

- 🐛 **Report bugs:** [GitHub Issues](https://github.com/ACE-Z666/Chat-app/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/ACE-Z666/Chat-app/discussions)
- 📧 **Email:** support@chatapp.com

---

<div align="center">

**Built with ❤️ using the MERN Stack**

[⬆ Back to Top](#chat-app-)

</div>
