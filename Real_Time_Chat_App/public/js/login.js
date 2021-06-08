const socket = io("/")

socket.on("loginpageloding",Rooms=>{
    setrooms(Rooms)
})
socket.on("RoomAdded",Rooms=>{
    setrooms(Rooms,focus=true)
})

socket.on("Success",user=>{
    console.log(user)
    const url = `/${user.room}&${user.id}&${user.name}`;
    console.log(url)
    window.open(url,"_self")
})




const username = document.getElementById("nameinput");
const room = document.getElementById("rooms");
const newroominput = document.getElementById("newroominput");


function setrooms(totalrooms,focus = false){
    const room = document.getElementById("rooms");
    room.innerHTML='';
    totalrooms.unshift("Select Room")
    for(var i=0;i<totalrooms.length;i++){
        const roomoption = document.createElement("option");
        roomoption.innerHTML = totalrooms[i];
        room.append(roomoption);
    }
    if (focus){
        room.selectedIndex = `${totalrooms.length-1}`;
    }
}


function joinroom(){
    const username = document.getElementById("nameinput");
    const room = document.getElementById("rooms");
    if((username.value.trim() && room.value.trim())&& room.value!="Select Room"){
        console.log(username.value,room.value)
        socket.emit("LOGIN",username.value,room.value)
    }
    else{
        alert("Please enter name and select a room")
    }
    username.value = '';
    room.selectedIndex = '0';
}



//completed ####################
function newroom(){
    const createroom = document.getElementById("createroom");
    createroom.style.display = "block";
}

function createroom(){
    const newroominput = document.getElementById("newroominput");
    socket.emit("ADDROOM",newroominput.value)
    newroominput.value = "";
    const createroom = document.getElementById("createroom");
    createroom.style.display = "none";
}