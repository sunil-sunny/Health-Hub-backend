//author: Vidip Malhotra
const userInsurance = require('../models/userinsurance');

//API to post User Insurance
exports.postuserdetails = async (req,res,next) => {
    const ques = new userInsurance(req.body);
    try{
        const question = await userInsurance.find({"user_id":req.params.user_id});
        if(question.length > 0)
        {
            const a = await userInsurance.remove({"user_id":req.params.user_id});
        }
        const savedQuestion = await ques.save();
        res.json(savedQuestion);
    } catch(err)
    {
        res.json({ message: err });
    }
}


//API to get Insurances as per user
exports.getUserDetails = async (req, res, next) => {
    try{
        const question = await userInsurance.find({"user_id":req.params.userId});
        var array = [];
        array.push(question);
        res.json(array);
    } catch (err) {
        res.json({ message : err });
    }
}

//API to get Insurances as per user
exports.getuser = async (req, res, next) => {
    try{
        const question = await userInsurance.find({"user_id":req.params.user_id});
        res.json(question);
    } catch (err) {
        res.json({ message : err });
    }
}

return exports;