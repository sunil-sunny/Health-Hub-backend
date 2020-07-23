const express = require("express");
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

const { verifyToken } = require('../config/auth');
const { JWT_SECRET } = require("../config/keys");



module.exports = (passport, jwt) => {
    const { registerUser, registerDoctor, loginUser, logoutUser, sendVerificationToken, updatePassword } = require('../controllers/userController')(passport, jwt);

    router.post("/register", registerUser);

    router.post('/register-doctor', registerDoctor);

    router.post('/login', loginUser);

    router.get('/logout', verifyToken, logoutUser);

    router.post('/send-token', sendVerificationToken)

    router.post('/update-password', updatePassword)

    return router;
}

