const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../Config/generateToken');
const { body, validationResult } = require('express-validator');


const loginController = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await UserModel.findOne({ name });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      success: true,
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
      message: 'Login successful',
    });
  } else {
    res.status(400);
    throw new Error('Invalid Username or Password');
  }
});

const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  const usernameExist = await UserModel.findOne({ name });
  if (usernameExist) {
    res.status(400);
    throw new Error('Username already exists');
  }

  const user = await UserModel.create({ name, email, password });
  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
      message: 'Registration successful',
    });
  } else {
    res.status(400);
    throw new Error('Registration Error');
  }
});

const fetchAllUsersController = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const users = await UserModel.find(keyword).find({ _id: { $ne: req.user._id } });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

router.post(
  "/register",
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  registerController
);

module.exports = { loginController, registerController, fetchAllUsersController };