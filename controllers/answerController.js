const Answer = require('../models/answer');
const Question = require('../models/question');

//API to get all Answers
exports.getAllAnswers = async (req, res, next) => {
    console.log("into res")
        try{
            const question = await Answer.find();
            res.json(question);
        } catch (err) {
            res.json({ message: err });
        }
}

//API to post Answer
exports.postAnswer = async (req, res, next) => {
    const ques = new Answer(req.body);
    console.log("post answers called");
    try{
    const savedAnswer = await ques.save();
    const updatecounter = await Question.update(
        {_id: req.body.question_id },
        { $set : { answer: 1} }
    );
    res.json(savedAnswer);
    } catch(err)
    {
        res.json({ message: err });
    }
}

//API to get all answers for that particular question
exports.getAnswerbyquestion = async (req, res, next) => {
    try{
        console.log("get answers called");
        console.log(req.params);
        const ans = await Answer.find({"question_id" : req.params.questionId});
        res.json(ans);
        console.log(ans);
    } catch (err) {
        res.json({ message : err });
    }
}

//API to upvote answer by question ID
exports.upvoteAnswerById = async (req, res, next) => {
    console.log("into upvote");
    console.log(req.body);
    try{
        const updatecounter = await Answer.update(
            {_id: req.params.answerId },
            { $set : { upvotes: req.body.upvote} }
        );
        res.json(updatecounter);
    } catch (err) {
        res.json({ message : err });
    }
}

return exports;