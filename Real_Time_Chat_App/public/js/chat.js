const socket = io("/")
console.log(Room,Id,Name)

document.getElementById("header").innerHTML="Name  : "+Name;
document.getElementById("roomname").innerHTML = Room;

socket.emit("getusers",Room)
socket.emit("JOINROOM",Room,Name)



socket.on("users",users=>{
    setusers(users)
})
socket.on("joined",()=>{
    addnotic(`You Joined ${Room} Room`)
})
socket.on("new-user-joined",user=>{
    setusers(user,oneuser=true)
})
socket.on("user-leaved",msg=>{
    addnotic(msg+" leaved the chat")
})
socket.on("recevmsg",(id,name,msg)=>{
    recevmsg(id,name,msg)
})

function recevmsg(id,name,msg){
    const msgbox = document.getElementById("msgbox");
    console.log(id,msg,name,"Got new msg")
    const newmsg = document.createElement("div");
    newmsg.classList = ["recevmsg"]
    newmsg.innerHTML = `<p><span>${name}: </span>${msg}</p><p>9:20pm</p>`;
    msgbox.append(newmsg);
}

function sendmsg(){
    const msginput = document.getElementById("msginput");
    if(msginput.value.trim()){
        socket.emit("sendmsg",Name,Room,Id,msginput.value.trim())
        const msgbox = document.getElementById("msgbox");
        const newmsg = document.createElement("div");
        newmsg.classList = ["sendmsg"]
        newmsg.innerHTML = `<p><span>You: </span>${msginput.value.trim()}</p><p>9:20pm</p>`;
        msgbox.append(newmsg);
    }
    else{
        alert("Write a message.")
    }
    msginput.value='';
}



function addnotic(text){
    const notic = document.getElementById("msgbox");
    const newnotic = document.createElement("div")
    newnotic.classList= ["notice"]
    newnotic.innerHTML = text;
    notic.append(newnotic);
}

function setusers(users,oneuser=false){
    const userdiv = document.getElementById("users");
    if(oneuser){
        const user = document.createElement("h4")
        user.classList=["username"];
        user.innerHTML=users;
        userdiv.append(user);
        addnotic(users+" joined the chat")
    }else{
        userdiv.innerHTML = '';
        for(var i=0;i<users.length;i++){
            const user = document.createElement("h4")
            user.classList=["username"];
            user.innerHTML=users[i];
            userdiv.append(user);
        }
    }
}


function Leave(){
    socket.emit("Leaving",Room,Id,Name);
    window.open("/","_self")
}