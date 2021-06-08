const express  = require('express')
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)
const {v4 : uuid4} = require('uuid')
server.listen(3000,()=>{console.log("server is Listening on port 3000")})

const TotalRooms = ["python","Kotlin","java","c++"]
const TotalUsers = []

app.set('view engine','ejs')
app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.render('login')
})
app.get("/:room&:id&:name",(req,res)=>{
    const para = req.params;
    res.render('chat',{room:para.room,id:para.id,name:para.name})
})



io.on("connection",socket=>{
    socket.emit("loginpageloding",TotalRooms)
    socket.on("LOGIN",(Name,Room)=>{
        const id = uuid4()
        const newuser = {"id":id,"name":Name,"room":Room}
        TotalUsers.push(newuser)
        socket.emit("Success",newuser)
    })
    socket.on("ADDROOM",Room=>{
        TotalRooms.push(Room)
        socket.emit("RoomAdded",TotalRooms)
    })
    socket.on("getusers",room=>{
        const user = []
        for(var i=0;i<TotalUsers.length;i++){
            if (TotalUsers[i].room==room){
                user.push(TotalUsers[i].name)
            }
        }
        socket.emit("users",user)
    })
    socket.on("JOINROOM",(room,name)=>{
        socket.join(room)
        socket.to(room).emit("new-user-joined",name)
        socket.emit("joined")
    })
    socket.on("sendmsg",(name,room,id,msg)=>{
        socket.to(room).emit("recevmsg",id,name,msg)
    })



    socket.on("Leaving",(room,id,name)=>{
        const user = {"id":id,"name":name,"room":room}
        var index = 0;
        for(index;index<TotalUsers.length;index++){
            if(TotalUsers[index].id===id){
                break;
            }
        }
        if (index>-1){
            socket.to(room).emit("user-leaved",name)
            TotalUsers.splice(index,1);
            const user = []
            for(var i=0;i<TotalUsers.length;i++){
                if (TotalUsers[i].room==room){
                    user.push(TotalUsers[i].name)
                }
            }
            socket.to(room).emit("users",user)
        }

    })
})