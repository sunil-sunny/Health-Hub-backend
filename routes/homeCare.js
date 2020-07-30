// author: Harshit Trivedi

const express = require("express");
const router = express.Router();
const { postHomeCare}  = require('../controllers/homeCareController');

router.route('/').post(postHomeCare)

module.exports = router;