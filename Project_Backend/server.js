// All The Imports----------------------------------------------
const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require('socket.io')(server)
const cors = require("cors")
const mongoose = require("mongoose")


//connecting to the database----------------------------------------------
mongoose.connect('mongodb://localhost/ClassRoom',{useNewUrlParser:true,useUnifiedTopology: true})
const db =  mongoose.connection
db.on("error",(err)=>{
    console.error(err)
})
db.on("open",()=>{
    console.log("connected to database")
})


//static files
app.use("/media",express.static("uploads"));

//All the middlewire----------------------------------------------
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//starting the server----------------------------------------------
server.listen(3001,()=>{console.log("Server is listening at 3001 port.")})


//for signup
const register = require("./router/register")
app.use("/signup",register)


//for login
const login = require("./router/login")
app.use("/login",login)

//for creating and joining new classes
const classes = require("./router/class")
app.use("/class",classes)

//for material of a class and details of class
const material = require("./router/material")
app.use("/material",material)