const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { default : mongoose } = require('mongoose');

const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());

app.get("/", (req,res) => {
    res.send("API is running...");
});

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


const PORT = process.env.PORT  || 5000;
app.listen(PORT, () => console.log('Server Running hii'));

