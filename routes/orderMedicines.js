// author: Harshit Trivedi

const express = require("express");
const router = express.Router();
const { getOrder, putOrder, postOrder, deleteOrder, getUserOrder } = require('../controllers/orderMedicineController');
const { getPharmacyList } = require('../controllers/pharmacyListController');

// get pharmacy names
router.route('/getPharmacyList').get(getPharmacyList)

// post a new order
router.route('/').post(postOrder)    

// get orders for given user and delete order
router.route('/:id').get(getUserOrder).delete(deleteOrder);

module.exports = router;