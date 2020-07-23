const bcrypt = require('bcryptjs');
const User = require('../models/User');

const { JWT_SECRET } = require("../config/keys");
const emailSender = require('../config/emailSender');

module.exports = (passport, jwt) => {
    exports.registerUser = (req, res) => {
        const { type, name, email, password } = req.body;

        User.findOne({ type, email })
            .then(user => {
                if (user) {
                    return res.status(200).json({
                        success: false,
                        error: 'Email is already in use'
                    })
                } else {
                    const newUser = new User({ type, name, email, password });
                    bcrypt.genSalt((err, salt) => {
                        if (err) throw err;
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(() => {
                                    return res.status(200).json({
                                        success: true,
                                        id: newUser._id
                                    })
                                })
                                .catch(err => console.log(err))
                        });
                    })
                }
            });
    }

    exports.registerDoctor = (req, res, next) => {
        const { type, email, image, location, specialization, description, fee } = req.body;
        User.findOneAndUpdate({ type, email }, {
            image, location, specialization, description, fee
        }, { new: true }, (err, user) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: err
                });
            }
            res.status(200).json({
                success: true,
                user: { ...user._doc, password: undefined }
            });
        })
    }

    exports.loginUser = (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (user) {
                jwt.sign({ user }, JWT_SECRET, (err, token) => {
                    if (err) throw err;
                    req.logIn(user, (err) => {
                        console.log(req.user)
                        if (err) throw err;
                        res.status(200).json({
                            success: true,
                            user: { ...user._doc, password: undefined },
                            token
                        });
                    })
                })

            } else {
                res.status(200).json({
                    success: false,
                    message: info.message
                });
            }
        })(req, res, next);
    }

    exports.logoutUser = (req, res, next) => {
        jwt.verify(req.token, JWT_SECRET, (err, authData) => {
            if (err) res.status(403).json({
                success: false
            });
            else {
                req.logout();
                res.status(200).json({
                    success: true
                })
            }
        })
    }

    exports.sendVerificationToken = (req, res, next) => {
        const { type, email } = req.body;
        jwt.sign({ type, email }, JWT_SECRET, { expiresIn: '300s' }, (err, token) => {
            if (err) {
                res.status(200).json({
                    success: false,
                    message: 'Token generation failed ' + err
                });
            };
            message = "Your password reset token is " + token;
            emailSender(email, 'HealthHub - Reset Password', message)
                .then(() => {
                    res.status(200).json({
                        success: true,
                        token
                    });
                })
                .catch(err => {
                    res.status(200).json({
                        success: false,
                        message: 'Email Sending failed ' + err
                    });
                })

        });
    }

    exports.updatePassword = (req, res, next) => {
        const { token, type, email, newPassword } = req.body;
        jwt.verify(token, JWT_SECRET, (err, authData) => {
            if (err) res.status(403).json({
                success: false,
                message: err
            });
            else {
                console.log(authData);
                bcrypt.genSalt((err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if (err) throw err;
                        User.findOneAndUpdate({ type, email }, { password: hash },
                            { new: true }, (err, user) => {
                                if (err) {
                                    res.status(400).json({
                                        success: false,
                                        message: err
                                    });
                                }
                                res.status(200).json({
                                    success: true,
                                    user: { ...user._doc, password: undefined }
                                });
                            })
                    });
                })

            }
        })
    }

    return exports;

}


