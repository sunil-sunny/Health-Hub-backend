//author: Vidip Malhotra
const Insurance = require('../models/insurance');
const userInsurance = require('../models/userinsurance');
const emailSender = require('../config/emailSender');

//API to get ALL Insurances
exports.getAll = async (req, res, next) => {
        try{
            const question = await Insurance.find();
            res.json(question);
        } catch (err) {
            res.json({ message: 'Fetch Failed' });
        }
    }

//API to get list of specific insurances
exports.getspecificInsurance = async (req, res, next) => {
    try{
        const userresults = await userInsurance.find({"user_id":req.params.user_id});
        var category = userresults[0].category;
        var age = userresults[0].age;
        var profession = userresults[0].profession;
        const question = await Insurance.find({"category":category,"age":age,"profession":profession});
        res.json(question);
    } catch (err) {
        res.json({ message : err });
    }
}

//API to send email
exports.sendEmail= async (req, res, next) => {
    try{
        emailSender(req.params.email, 'HealthHub - HealthPlan Purchase Request', req.params.message)
        .then(() => {
            res.json({message:"Sent"});
        })
        .catch(err => {
            res.json({message:"Failed"})
        })
        
    }
    catch(err)
    {
        res.json({ message : err });
    }
}

return exports;