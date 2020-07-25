const express = require("express");
const bcrypt = require('bcryptjs');

const router = express.Router();
const Feedback = require('../models/Feedback');
const passport = require('passport');

const { verifyToken } = require('../config/auth');
const { JWT_SECRET } = require("../config/keys");

const { getfeedback, getbyid, postfeedback, putfeedback } = require('../controllers/feedbackController');

router.get('/', (req, res) => res.send("Server is running"))
router.get('/feedback', getfeedback);
router.get('feedback/:id', getbyid);
router.post('/feedback', postfeedback);
router.put('/feed', putfeedback);

module.exports = router;
