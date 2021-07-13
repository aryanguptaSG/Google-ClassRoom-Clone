const express = require("express")
const router = express.Router()
const teacher = require('../model/teacher')
const student = require('../model/student')
const bcrypt = require("bcrypt")

//signup as a teacher
router.post("/t", async (req, res) => {
    const email = req.body.email;
    if ((await teacher.find({ "Email": email })).length > 0) {
        res.status(400).json({ message: "This Email is Already used" })
    }
    else {
        const pass = await bcrypt.hash(req.body.pass, 10);
        const Teacher = new teacher({
            Name: req.body.name,
            Password: pass,
            Email: req.body.email,
            Phone: req.body.phone,
            Classes: req.body.classes
        })
        try {
            const newTeacher = await Teacher.save()
            res.status(201).json(newTeacher)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
})


//signup as a student
router.post("/s", async (req, res) => {
    const email = req.body.email;
    if ((await student.find({ "Email": email })).length > 0) {
        res.status(400).json({ message: "This Email is Already used" })
    }
    else {
        const pass = await bcrypt.hash(req.body.pass, 10);
        const Student = new student({
            Name: req.body.name,
            Password: pass,
            Email: req.body.email,
            Phone: req.body.phone,
            Classes: req.body.classes
        })
        try {
            const newStudent = await Student.save()
            res.status(201).json(newStudent)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
})


module.exports = router