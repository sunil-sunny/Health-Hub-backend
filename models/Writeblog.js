
const mongoose = require('mongoose');

var Writeblog = new mongoose.Schema({
    name: {type:String},
    title: { type: String },
    introduction: { type: String },
    content: { type: String },

});

module.exports = mongoose.model('Writeblog Info', Writeblog);