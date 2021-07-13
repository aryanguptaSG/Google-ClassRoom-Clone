const mongoose = require("mongoose")

const classes = new mongoose.Schema({
    Name:{
        type :String,
        required : true
    },
    Desc:{
        type:String,
        require:true
    },
    Teacher:{
        type :String,
        required : true
    },
    Students:{
        type:Array,
        required:true
    },
    Material:{
        type:Array,
        required:true
    },
    CreateDate:{
        type : Date,
        required:true,
        default : Date.now
    }

})

module.exports = mongoose.model("Classes",classes)