//author: Vidip Malhotra
const express = require('express');
const router = express.Router();
const UserInsuranceController = require('../controllers/userinsuranceController');

router.get('/', UserInsuranceController.getUserDetails);
router.post('/userdetails/:user_id',UserInsuranceController.postuserdetails);
router.get('/userdetails/:user_id',UserInsuranceController.getuser);
module.exports = router;