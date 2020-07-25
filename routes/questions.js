const express = require('express');
const router = express.Router();
const passport = require('passport');

const { verifyToken } = require('../config/auth');
const { JWT_SECRET } = require("../config/keys");


module.exports = (jwt) => {
const QuestionsController = require('../controllers/questionController')(jwt);
router.get('/', QuestionsController.getAllQuestions);
router.post('/', QuestionsController.postQuestion);
router.get('/category/:category',QuestionsController.getQuestionByCategory);
router.get('/:questionId',QuestionsController.getQuestionById);
router.post('/upvote/:questionId',QuestionsController.upvoteQuestionById);
return router;
}
