const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../Config/generateToken');


const loginController = expressAsyncHandler(async (req, res) => {
    const {name , password} = req.body;
    const user = await UserModel.findOne({name});
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,  
            isAdmin : user.isAdmin,
            token: generateToken(user._id), 
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid Username or Password");
    }



});




const registerController = expressAsyncHandler(async (req, res) => {
   const { name, email, password } = req.body;
   
   if (!name || !email || !password) {
    res.send (400);
      throw Error ("Please add all fields");
   }
   const userExist = await UserModel.findOne({email});
   if(userExist){
    throw new Error("User already exists");

   }
   const usernameExist = await UserModel.findOne({name});
   if(usernameExist){
    throw new Error("Username already exists");
   }
    const user = await UserModel.create ({ name, email, password } ); 
   if (user) {
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,  
        isAdmin : user.isAdmin,
        token: generateToken(user._id),

    });
}
   else {
    res.status(400);
    throw new Error("Registration Error");
   } 
});

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search
    ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    }
    : {};

    const users = await UserModel.find(keyword).find({ _id: { $ne: req.user._id } });

    res.send(users);

});

module.exports = { loginController, registerController, fetchAllUsersController };