const express = require("express")
const router = express.Router()
const teacher = require('../model/teacher')
const student = require('../model/student')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//This will be in .env file after words
const SECRET_KEY='d432e046e9fc15de734f2cb4d718b2bc478dc86b316c743469bc464254d679142bd63a1619ab5541e5a1eee7570dafb762082ffcd109639d40e2acea12603279';

//login as a teacher
router.post("/t", async (req,res)=>{
    const email = req.body.email;
    const pass = req.body.pass;
    const user = await teacher.find({"Email":email})
    if(user.length<=0){
        return res.status(500).json({auth:false,message:"Not user with this email"})
    }
    try{
        if(await bcrypt.compare(pass,user[0].Password)){
            const data = {id:user[0]._id}
            const authToken =  jwt.sign(data,SECRET_KEY,{expiresIn:"1440m"})
            return res.status(200).json({authToken:authToken,auth:true,Name:user[0].Name})
        }
        else{
            return res.status(500).json({auth:false,message:"Wrong Password ."})
        }
    }
    catch{
        return res.status(500).json({auth:false,message:"Wrong Password ."})
    }
})


//login as a student
router.post("/s", async (req,res)=>{
    const email = req.body.email;
    const pass = req.body.pass;
    const user = await student.find({"Email":email})
    if(user.length<=0){
        return res.status(500).json({auth:false,message:"Not user with this email"})
    }
    try{
        if(await bcrypt.compare(pass,user[0].Password)){
            const data = {id:user[0]._id}
            const authToken = jwt.sign(data,SECRET_KEY,{expiresIn:"1440m"})
            return res.status(200).json({authToken:authToken,auth:true,Name:user[0].Name})
        }
        else{
            return res.status(500).json({auth:false,message:"Wrong Password ."})
        }
    }
    catch{
        return res.status(500).json({auth:false,message:"Wrong Password."})
    }
})

router.get("/getuser",(req,res)=>{
    const authToken = req.headers["authtoken"];
    jwt.verify(authToken,SECRET_KEY,(err,user)=>{
        if(err){
            res.status(400).send("Un Authrised.")
        }
        else{
            res.status(200).json({auth:true,userid:user.id})
        }
    })
})


module.exports = router