const express = require('express');
const { loginController, registerController, fetchAllUsersController } = require('../Controllers/userController');

const { protect } = require('../middleware/auth');

const { validateRegister, validateLogin} = require('../middleware/validationMiddleware');
const Router =  express.Router();

Router.post ("/login", validateLogin, loginController);
Router.post ("/register", validateRegister, registerController);
Router.get ("/users", protect, fetchAllUsersController);


module.exports = Router;