const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the authorization header contains a Bearer token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Decode the token to get the user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID and attach the user object to the request object
            req.user = await UserModel.findById(decoded.id).select('-password');

            // Call the next middleware or route handler
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };
