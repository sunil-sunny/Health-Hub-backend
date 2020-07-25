//author: Vidip Malhotra
const express = require('express');
const router = express.Router();
const AnswerController = require('../controllers/answerController');

router.get('/', AnswerController.getAllAnswers);
router.post('/', AnswerController.postAnswer);
router.get('/:questionId',AnswerController.getAnswerbyquestion);
router.post('/upvote/:answerId',AnswerController.upvoteAnswerById);

module.exports = router;
