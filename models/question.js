//author: Vidip Malhotra
const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
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
    category:{
        type:String,
        required:true
    },
    answer:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Question',questionSchema);
