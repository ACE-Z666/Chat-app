const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');

const { default : mongoose } = require('mongoose');

const app = express();
dotenv.config();

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



const PORT = process.env.PORT  || 5000;
app.listen(PORT, () => console.log('Server Running hii'));

