//author: Vidip Malhotra
const mongoose = require('mongoose');

const userinsuranceSchema = mongoose.Schema({
    user_id:{
        type:String,
        required: true
    },
    salary:{
        type:String,
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
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('UserInsurance',userinsuranceSchema);