const mongoose = require("mongoose")

const teacher = new mongoose.Schema({
    Name:{
        type :String,
        required : true
    },
    Email:{
        type :String,
        required : true
    },
    Password:{
        type:String,
        required:true
    },
    Phone:{
        type :String,
        required : true
    },
    Classes:{
        type : Array,
        required:true,
    },
    SignupDate:{
        type : Date,
        required:true,
        default : Date.now
    }

})

module.exports = mongoose.model("Teachers",teacher)