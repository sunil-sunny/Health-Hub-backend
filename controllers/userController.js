/* @author Avinash Gazula <agazula@dal.ca> */

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const { JWT_SECRET } = require('../config/keys');
const emailSender = require('../config/emailSender');

module.exports = (passport, jwt) => {
    exports.registerUser = (req, res) => {
        const { type, name, email, password } = req.body;

        User.findOne({ type, email }).then((user) => {
            if (user) {
                return res.status(200).json({
                    success: false,
                    error: 'Email is already in use',
                });
            } else {
                const newUser = new User({ type, name, email, password });
                bcrypt.genSalt((err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(() => {
                                return res.status(200).json({
                                    success: true,
                                    id: newUser._id,
                                });
                            })
                            .catch((err) => {
                                return res.status(200).json({
                                    success: false,
                                    error: err,
                                });
                            });
                    });
                });
            }
        });
    };

    exports.registerDoctor = (req, res, next) => {
        const {
            type,
            email,
            image,
            location,
            specialization,
            description,
            fee,
        } = req.body;
        User.findOneAndUpdate(
            { type, email },
            {
                image,
                location,
                specialization,
                description,
                fee,
            },
            { new: true },
            (err, user) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: err,
                    });
                }
                res.status(200).json({
                    success: true,
                    user: { ...user._doc, password: undefined },
                });
            }
        );
    };

    exports.loginUser = (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (user) {
                jwt.sign({ user }, JWT_SECRET, (err, token) => {
                    if (err) throw err;
                    req.logIn(user, (err) => {
                        console.log(req.user);
                        if (err) throw err;
                        res.status(200).json({
                            success: true,
                            user: { ...user._doc, password: undefined },
                            token,
                        });
                    });
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: info.message,
                });
            }
        })(req, res, next);
    };

    exports.editProfile = (req, res) => {
        const {
            type,
            name,
            currentEmail,
            newEmail,
            password,
            image,
            location,
            specialization,
            description,
            fee,
        } = req.body;
        let newDetails = {};
        name && (newDetails.name = name);
        newEmail && (newDetails.email = newEmail);
        password && (newDetails.password = password);
        image && (newDetails.image = image);
        location && (newDetails.location = location);
        specialization && (newDetails.specialization = specialization);
        description && (newDetails.description = description);
        fee && (newDetails.fee = fee);
        console.log(currentEmail);
        console.log(type);
        User.findOneAndUpdate(
            { email: currentEmail, type },
            newDetails,
            { new: true },
            (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(200).json({
                        success: false,
                        error: err,
                    });
                }
                console.log(user);
                res.status(200).json({
                    success: true,
                    user: { ...user._doc, password: undefined },
                });
            }
        );
    };

    exports.logoutUser = (req, res, next) => {
        jwt.verify(req.token, JWT_SECRET, (err, authData) => {
            if (err)
                res.status(403).json({
                    success: false,
                });
            else {
                req.logout();
                res.status(200).json({
                    success: true,
                });
            }
        });
    };

    exports.sendVerificationToken = (req, res, next) => {
        const { type, email } = req.body;
        User.find({ type, email })
            .then((models) => {
                if (models.length === 0) {
                    res.status(200).json({
                        success: false,
                        message: 'User with the provided email does not exist',
                    });
                } else {
                    jwt.sign(
                        { type, email },
                        JWT_SECRET,
                        { expiresIn: '300s' },
                        (err, token) => {
                            if (err) {
                                res.status(200).json({
                                    success: false,
                                    message: 'Token generation failed',
                                    error: err,
                                });
                            }
                            message = 'Your password reset token is ' + token;
                            emailSender(
                                email,
                                'HealthHub - Reset Password',
                                message
                            )
                                .then(() => {
                                    res.status(200).json({
                                        success: true,
                                        token,
                                    });
                                })
                                .catch((err) => {
                                    res.status(200).json({
                                        success: false,
                                        message: 'Email Sending failed',
                                        error: err,
                                    });
                                });
                        }
                    );
                }
            })
            .catch((err) => {
                throw err;
            });
    };

    exports.updatePassword = (req, res, next) => {
        const { token, type, email, newPassword } = req.body;
        jwt.verify(token, JWT_SECRET, (err, authData) => {
            if (err)
                res.status(200).json({
                    success: false,
                    message: 'Invalid Token',
                });
            else {
                console.log(authData);
                bcrypt.genSalt((err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if (err) throw err;
                        User.findOneAndUpdate(
                            { type, email },
                            { password: hash },
                            { new: true },
                            (err, user) => {
                                if (err) {
                                    res.status(400).json({
                                        success: false,
                                        message: err,
                                    });
                                }
                                res.status(200).json({
                                    success: true,
                                    user: { ...user._doc, password: undefined },
                                });
                            }
                        );
                    });
                });
            }
        });
    };

    exports.verifyUser = (req, res) => {
        const { token } = req.query;
        jwt.verify(token, JWT_SECRET, (err, authData) => {
            if (err) {
                res.status(200).json({
                    success: false,
                    message: 'Invalid Token',
                });
            } else {
                res.status(200).json({
                    success: true,
                    authData,
                });
            }
        });
    };

    return exports;
};
