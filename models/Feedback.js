
const mongoose = require('mongoose');
var Feedback = new mongoose.Schema({
name : {type : String},
date: {type: String},
feedback: {type:String},

});
module.exports= mongoose.model('Feedback Info',Feedback);