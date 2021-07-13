const express = require("express")
const router = express.Router()
const teacher = require('../model/teacher')
const student = require('../model/student')
const classes = require('../model/classes')
const jwt = require("jsonwebtoken")

//This will be in .env file after words
const SECRET_KEY='d432e046e9fc15de734f2cb4d718b2bc478dc86b316c743469bc464254d679142bd63a1619ab5541e5a1eee7570dafb762082ffcd109639d40e2acea12603279';

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

//create new class
router.post("/create", auth,async (req,res)=>{
    const name = req.body.name;
    const teacherid = req.userid;
    const NewClass = new classes({
        Name: req.body.name,
        Desc:req.body.desc,
        Teacher:teacherid,
        Students:[],
        Material:[]
    })

    try {
        const newclass = await NewClass.save();
        const Teacher = await teacher.findById(teacherid);
        Teacher.Classes.push(newclass._id);
        await Teacher.save();
        res.status(201).json(newclass)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})



//join new class
router.post("/join", auth,async (req,res)=>{
    const classid = req.body.id;
    const studentid = req.userid;
    try {
        const classinfo = await classes.findById(classid);
        const Student = await student.findById(studentid);
        if(classinfo){
        if(classinfo.Students.includes(studentid)){
            return res.status(200).json({message: "You Have Already Joined This Class."})
        }
        Student.Classes.push(classid);
        classinfo.Students.push(studentid);
        await Student.save();
        await classinfo.save();
        res.status(201).json({message: "SuccessFully Joined"})
    }
    else{
        res.status(400).json({ message: "Class Not Found." })
    }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

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
//get All Classes of a Teacher.
router.get("/t",getauth,async (req,res)=>{
    const user = await teacher.findById(req.userid);
    if(user){
        const data = []
        for(var i=0;i<user.Classes.length;i++){
            var c = await classes.findById(user.Classes[i])
            data.push({
                id:c.id,
                Title:c.Name,
                Teacher : user.Name,
                Desc:c.Desc
            })
        }
        res.status(200).json(data)
    }
    else{
        res.status(404).json({message:"Teacher is not Found."})
    }
})

//get All Classes of a Student.
router.get("/s",getauth,async (req,res)=>{
    const user = await student.findById(req.userid);
    if(user){
        const data = []
        for(var i=0;i<user.Classes.length;i++){
            var c = await classes.findById(user.Classes[i])
            if(c){
            var t = await teacher.findById(c.Teacher)
            data.push({
                id:c.id,
                Title:c.Name,
                Teacher : t.Name,
                Desc:c.Desc
            })
        }
        else{
            user.Classes.splice(i,1)
            await user.save()
        }
    }
        res.status(200).json(data)
    }
    else{
        res.status(404).json({message:"Student is not Found."})
    }
})


//delete a class from student list
router.put("/leave",auth,async (req,res)=>{
    const Student = await student.findById(req.userid)
    const classid = req.body.id
    if(Student){
        const index = Student.Classes.indexOf(classid)
        if(index>-1){
            const Class = await classes.findById(classid)
            if(Class){
                const sindex = Class.Students.indexOf(req.userid)
                if(sindex>-1){
                    Class.Students.splice(sindex,1);
                    await Class.save();
                    Student.Classes.splice(index,1)
                    await Student.save();
                    res.status(200).json({message:"Successfully Removed"})
                }
                else{
                    res.status(404).json({message:"You have not joind this class yet."})
                }
            }
            else{
                res.status(404).json({message:"Class not found."})
            }
            
        }
        else{
            res.status(404).json({message:"You have not joind this class yet."})
        }
    }
    else{
        res.status(404).json({message:"Student not found."})
    }
})


////remove and delete class from Teacher list.
router.put("/delete",auth,async (req,res)=>{
    const Teacher = await teacher.findById(req.userid)
    const classid = req.body.id
    if(Teacher){
        const index = Teacher.Classes.indexOf(classid)
        if(index>-1){
            const Class = await classes.findById(classid)
            await Class.remove();
            Teacher.Classes.splice(index,1)
            await Teacher.save();
            res.status(200).json({message:"Successfully Removed"})
        }
        else{
            res.status(404).json({message:"You have not created this class yet."})
        }
    }
    else{
        res.status(404).json({message:"Teacher not found."})
    }
})

module.exports = router