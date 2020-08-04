//author: Vidip Malhotra
const mongoose = require('mongoose');

const insuranceSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    company:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    dentalcare:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Insurance',insuranceSchema);