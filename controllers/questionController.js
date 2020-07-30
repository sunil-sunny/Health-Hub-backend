//author: Vidip Malhotra
const Question = require('../models/question');
const { JWT_SECRET } = require('../config/keys');

//API to get ALL Questions
exports.getAllQuestions = async (req, res, next) => {
        console.log("into res");
        console.log()
        try{
            const question = await Question.find();
            res.json(question);
        } catch (err) {
            res.json({ message: err });
        }
    }

//API to post Question
exports.postQuestion = async (req,res,next) => {
    const ques = new Question(req.body);
    try{
    const savedQuestion = await ques.save();
    res.json(savedQuestion);
    } catch(err)
    {
        res.json({ message: err });
    }
}

//API to get QuestionByCategory
exports.getQuestionByCategory = async (req, res, next) => {
    try{
        console.log(req.params);
        const question = await Question.find({"category":req.params.category});
        res.json(question);
    } catch (err) {
        res.json({ message : err });
    }
}

//API to get Question by ID
exports.getQuestionById = async (req, res, next) => {
    try{
        console.log(req.params);
        const question = await Question.findById(req.params.questionId);
        console.log(question);
        var array = [];
        array.push(question);
        res.json(array);
    } catch (err) {
        res.json({ message : err });
    }
}

//API to upvote Question
exports.upvoteQuestionById = async (req, res, next) => {
    console.log("into upvote");
    console.log(req.body);
    try{
        const updatecounter = await Question.update(
            {_id: req.params.questionId },
            { $set : { upvotes: req.body.upvote} }
        );
        res.json(updatecounter);
    } catch (err) {
        res.json({ message : err });
    }
}
return exports;
