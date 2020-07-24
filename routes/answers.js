const express = require('express');
const router = express.Router();
const passport = require('passport');
const { verifyToken } = require('../config/auth');
const { JWT_SECRET } = require("../config/keys");
const AnswerController = require('../controllers/answerController');

router.get('/', AnswerController.getAllAnswers);
router.post('/', AnswerController.postAnswer);
router.get('/:questionId',AnswerController.getAnswerbyquestion);
router.post('/upvote/:answerId',AnswerController.upvoteAnswerById);

module.exports = router;