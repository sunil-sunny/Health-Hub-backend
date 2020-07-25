const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    user_by:{
        type:String,
        required:true
    },
    upvotes:{
        type:Number,
        required:true
    },
    question_id:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Answer',answerSchema);