const mongoose = require("mongoose")

const student = new mongoose.Schema({
    Name:{
        type :String,
        required : true
    },
    Email:{
        type :String,
        required : true
    },
    Password:{
        type: String,
        required:true
    },
    Classes:{
        type : Array,
        required:true,
    },
    Phone:{
        type :String,
        required : true
    },
    SignupDate:{
        type : Date,
        required:true,
        default : Date.now
    }

})

module.exports = mongoose.model("Students",student)