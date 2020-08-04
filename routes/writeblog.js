
const express = require("express");
const bcrypt = require('bcryptjs');

const router = express.Router();
const Feedback = require('../models/Writeblog');
const passport = require('passport');

const { verifyToken } = require('../config/auth');
const { JWT_SECRET } = require("../config/keys");

const { getwriteblog, getbyid, postwriteblog, putwriteblog } = require('../controllers/writeblogController');

router.get('/', (req, res) => res.send("Server is running"))
router.get('/writeblog', getwriteblog);
router.get('writeblog/:id', getbyid);
router.post('/writeblog', postwriteblog);
router.put('/write', putwriteblog);

module.exports = router;