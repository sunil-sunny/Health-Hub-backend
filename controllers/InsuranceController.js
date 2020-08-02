//author: Vidip Malhotra
const Insurance = require('../models/insurance');
const userInsurance = require('../models/userinsurance');

//API to get ALL Insurances
exports.getAll = async (req, res, next) => {
        console.log("into res");
        console.log();
        try{
            const question = await Insurance.find();
            res.json(question);
            console.log(question);
        } catch (err) {
            res.json({ message: err });
        }
    }

//API to get list of specific insurances
exports.getspecificInsurance = async (req, res, next) => {
    try{
        console.log(req.params);
        const userresults = await userInsurance.find({"user_id":req.params.user_id});
        var category = userresults[0].category;
        var age = userresults[0].age;
        var profession = userresults[0].profession;
        const question = await Insurance.find({"category":category,"age":age,"profession":profession});
        console.log(question)
        res.json(question);
    } catch (err) {
        res.json({ message : err });
    }
}

return exports;