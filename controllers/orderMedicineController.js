/* @author Harshit Trivedi <harshit.trivedi@dal.ca> */

const orderMedicine = require('../models/OrderMedicine');

// GET orders for a given user
exports.getUserOrder = async (req, res, next) => {
    try {
        const orders = await orderMedicine.find({ userId: req.params.id });
        // check if there are any orders for the givem userId
        if (!orders) {
            return res.status(404).json({
                success: false,
                error: 'No order found for the given user'
            })
        } else {
            // everything went fine status = OK
            return res.status(200).json({
                success: true,
                count: orders.length,
                data: orders
            });
        }
    } catch (err) {
        // send server error
        return res.send(500).json({
            success: false,
            error: 'Cannot GET, server Error'
        });
    }
}

// POST a new order
exports.postOrder = async (req, res, next) => {
    try {
        const { pharmacyName, apartmentNo, streetAddress,
            postalCode, mobileNumber, prescription, comments, userId } = req.body;
        const orders = await orderMedicine.create(req.body);
        // everything went fine status = OK
        return res.status(201).json({
            success: true,
            data: orders
        });
    } catch (err) {
        // send server error
        return res.status(500).json({
            success: false,
            error: "Cannot post, server error"
        });
    }
}

// DELETE an order
exports.deleteOrder = async (req, res, next) => {
    try {
        const orders = await orderMedicine.findById(req.params.id);
        // check if there are any orders for the givem userId
        if (!orders) {
            return res.status(404).json({
                success: false,
                error: "No order found"
            });
        }
        // delete order
        await orders.remove();
        // order deleted successfully status = OK
        return res.status(200).json({
            success: true,
            message: "Order Deleted"
        });
    } catch (err) {
        // send server error
        return res.status(500).json({
            success: false,
            error: "Cannot delete, server error"
        });
    }
}
