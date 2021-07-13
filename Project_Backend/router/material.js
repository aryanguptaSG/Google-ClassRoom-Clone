const express = require("express")
const router = express.Router()
const teacher = require('../model/teacher')
const student = require('../model/student')
const classes = require('../model/classes')
const material = require("../model/material")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const { route } = require("./class")

//This will be in .env file after words
const SECRET_KEY='d432e046e9fc15de734f2cb4d718b2bc478dc86b316c743469bc464254d679142bd63a1619ab5541e5a1eee7570dafb762082ffcd109639d40e2acea12603279';

//Defining Upload Storage and Methods.
const storage = multer.diskStorage({
    destination:"./uploads",
    filename : (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }

})
const upload = multer({
    storage:storage
})


//Auth For put post delete Requests.
const auth=(req,res,next)=>{
    const authToken = req.body.authToken;
    jwt.verify(authToken,SECRET_KEY,(err,user)=>{
        if(err){
            res.status(404).send("Un Authrised.")
        }
        else{
            req.userid = user.id;
            next()
        }
    })
}

//Auth For Get Requests.
function getauth(req,res,next){
    const authToken = req.headers["authtoken"];
    jwt.verify(authToken,SECRET_KEY,(err,user)=>{
        if(err){
            res.status(400).send("Un Authrised.")
        }
        else{
            req.userid = user.id;
            next();
        }
    })
}

//for getting the details of Class.
router.get("/info/:id",getauth,async (req,res)=>{
    const classid = req.params.id.toString();
    try{
        const Class = await classes.findById(classid)
        if(Class){
            const Teacher = await teacher.findById(Class.Teacher)
            if(Teacher){
                res.status(200).json({Classinfo:Class,Teacher:Teacher.Name})
            }  
        }
        else{
            res.status(404).json({message:"Class Not Found."})
        }
    }
    catch{
        res.status(400).json({message:"Class id invalid"})
    }
})

// for uploadign the media by multer
router.post("/uploadmedia",upload.single("media"),(req,res)=>{

    res.status(200).json({
        success:true,
        url:`http://localhost:3001/media/${req.file.filename}`
    })

})


// for adding the material to database
router.post("/addmaterial",auth,async(req,res)=>{
    const Userid = req.userid;
    const Material = material({
        Title:req.body.title,
        Content:req.body.content,
        Link : req.body.link,
        MediaUrl :req.body.mediaurl,
        MediaType : req.body.mediatype,
        Class:req.body.class,
        Sender : req.body.teacher,
        SenderId : Userid,
        Messages:req.body.message
    })
    try{
        const M = await Material.save()
        res.status(201).json(M)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

//for getting all material of a class
router.get("/getmaterial/:id",getauth,async (req,res)=>{
    const classid = req.params.id.toString();
    try{
        const Materials = await material.find({Class:classid}).sort({CreateDate:-1})
        res.status(200).json(Materials);
    }
    catch{
        res.status(400).json({message:"No Material"})
    }
})

//get sender name
router.get("/sender/:id",getauth,async (req,res)=>{
    const id = req.params.id.toString();
    try{
        var user = await teacher.findById(id);
        if(user){
            res.status(200).json({Name:user.Name});
        }
        else{
            user = await student.findById(id);
            if(user){
                res.status(200).json({Name:user.Name});
            }
            else{
                res.status(404).json({message:"No User."});
            }
        }
    }
    catch{
        res.sendStatus(400)
    }
})


//foe geting material by an id
router.get("/wholematerial/:id",getauth,async(req,res)=>{
    const id = req.params.id.toString();
    try{
        var Material = await material.findById(id);
        if(Material){
            res.status(200).json(Material);
        }
        else{
            res.sendStatus(404)
        }
    }
    catch{
        res.sendStatus(400)
    }
})

module.exports = router