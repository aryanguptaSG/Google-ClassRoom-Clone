import React,{useEffect, useState} from 'react'
// import { CardColumns } from 'react-bootstrap'
import ClassCard from "./ClassCard"
import axios from "axios"


export default function Home({ islogin}) {
    const [classes,setclasses] = useState([])
    useEffect(()=>{
        if(islogin){
            const role = localStorage.getItem("role");
            if(role==="As a Student"){
                axios.get("http://localhost:3001/class/s",{
                    headers:{
                        "authToken":localStorage.getItem("authToken")
                    }
                }).then(result=>{
                    setclasses(result.data)
                }).catch(err=>{
                    localStorage.removeItem("islogin");
                    localStorage.removeItem("role");
                    localStorage.removeItem("authToken");
                })
            }
            else{
                axios.get("http://localhost:3001/class/t",{
                    headers:{
                        "authToken":localStorage.getItem("authToken")
                    }
                }).then(result=>{
                    setclasses(result.data)
                }).catch(err=>{
                    localStorage.removeItem("islogin");
                    localStorage.removeItem("role");
                    localStorage.removeItem("authToken");
                })

            }
        }
    },[islogin])
    return (
        <div style={{position:"relative",top:"100px"}}>
        {islogin ?
            <>
            {classes.length>0?
            <div style={{display:"flex",flexWrap:"wrap",
            justifyContent:"center",alignItems:"self-start"}}>{
                classes.map((info)=>{
                    return(
                        <ClassCard key={info.id} id={info.id} Title={info.Title}
                        Teacher = {info.Teacher}
                        Desc={info.Desc}
                        />
                    )
                })
                }
                </div>
            : <h1 style={{display:"flex",alignItems:"stretch",justifyContent:"center"}}>No Classes yet.</h1>
            }
            </>
            :
            <>
            <h1 style={{display:"flex",alignItems:"stretch",justifyContent:"center"}}>Please Login First To See Your Classes.</h1>
            </>
        }
        </div>
    )
}
