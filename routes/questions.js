//author: Vidip Malhotra
const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/questionController');

router.get('/', QuestionsController.getAllQuestions);
router.post('/', QuestionsController.postQuestion);
router.get('/category/:category',QuestionsController.getQuestionByCategory);
router.get('/:questionId',QuestionsController.getQuestionById);
router.post('/upvote/:questionId',QuestionsController.upvoteQuestionById);
module.exports = router;
