// author: Harshit Trivedi

const homeCare = require('../models/HomeCare');

exports.postHomeCare = async (req, res, next) => {
    try {
        const { userName, address, homeCareDate,
            comments, date, mobileNumber } = req.body;

        const orders = await homeCare.create(req.body);
        // everything went fine, status = OK
        return res.status(201).json({
            success: true,
            data: orders
        });
    } catch (err) {
        // server error
        return res.status(500).json({
            success: false,
            error: "Cannot post, server error"
        });
    }
}