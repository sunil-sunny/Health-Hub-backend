/* @author Avinash Gazula <agazula@dal.ca> */

const express = require('express');
const router = express.Router();

const { verifyToken } = require('../config/auth');

module.exports = (passport, jwt) => {
    const {
        registerUser,
        registerDoctor,
        loginUser,
        editProfile,
        logoutUser,
        sendVerificationToken,
        updatePassword,
        verifyUser,
    } = require('../controllers/userController')(passport, jwt);

    router.post('/register', registerUser);

    router.post('/register-doctor', registerDoctor);

    router.post('/login', loginUser);

    router.post('/edit', editProfile);

    router.get('/logout', verifyToken, logoutUser);

    router.post('/send-token', sendVerificationToken);

    router.post('/update-password', updatePassword);

    router.get('/verify', verifyUser);

    return router;
};
