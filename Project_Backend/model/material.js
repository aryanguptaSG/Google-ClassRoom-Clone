const { json } = require("express")
const mongoose = require("mongoose")

const material = new mongoose.Schema({
    Title:{
        type :String,
        required : true
    },
    Content:{
        type :String,
        required : true
    },
    Link:{
        type :String,
    },
    MediaUrl:{
        type:String,
    },
    MediaType:{
        type:String
    },
    Class:{
        type :String,
        required : true
    },
    Sender:{
        type:String,
        required:true
    },
    SenderId:{
        type:String,
        required:true
    },
    Messages:{
        type : Array
    },
    CreateDate:{
        type : Date,
        required:true,
        default : Date.now
    }

})

module.exports = mongoose.model("Material",material)