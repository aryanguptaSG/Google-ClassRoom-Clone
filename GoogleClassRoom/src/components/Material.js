import React, { useEffect ,useState} from 'react'
import {Jumbotron,Button, Container} from 'react-bootstrap';
import Content from "./Content"
import {
    useParams
  } from "react-router-dom";
import axios from "axios";
import ShareSomething from "./ShareSomething";

export default function Material({islogin}) {
    const [shareModal,setshareModal] = useState(false);
    const CloseshareModal = () => setshareModal(false);
    const ShowshareModal = () => setshareModal(true);

    const [Class, setClass] = useState(null)
    const [Teacher, setTeacher] = useState(null)
    const [Material, setMaterial] = useState(null)
    const [Refresh, setRefresh] = useState(false)
    const { id } = useParams()
    useEffect(()=>{
        if(islogin){
            axios.get(`http://localhost:3001/material/info/${id}`,{
                headers:{
                    "authToken":localStorage.getItem("authToken")
                }
            }).then(result=>{
                setTeacher(result.data.Teacher)
                setClass(result.data.Classinfo)
            }).catch(err=>{
                alert(err.message)
            })

            axios.get(`http://localhost:3001/material/getmaterial/${id}`,{
                headers:{
                    "authToken":localStorage.getItem("authToken")
                }
            }).then(result=>{
                setMaterial(null)
                if(result.data.length>0){
                setMaterial(result.data)
            }

            }).catch(err=>{
                console.warn(err)
            })
        }
        setRefresh(false);
    },[islogin,id,Refresh])
    return (

        <div style={{position:"relative",top:"100px"}}>
        {islogin?
        <>
        {Class?
        <>
        <Jumbotron className="m-3">
            <h1>{Class.Name}</h1>
            <br/>
            <h5>{Teacher}</h5>
            <p>{Class.Desc}</p>
            <p>
                <Button variant="primary">Join Lecture</Button>
            </p>
        </Jumbotron>
        <Container className="py-3">
            <Button onClick={ShowshareModal} variant="primary" className="m-3 ">Share Something With Class...</Button>
            {Material?
            <>
            {Material.map(material=>{
               return <Content key={material._id} material={material}/>
            })}
            </>
            :<h1 style={{display:"flex",alignItems:"stretch",justifyContent:"center"}}>No Material To Show</h1>
            }
            
        </Container>
        <ShareSomething Teacher={Teacher} classid={id} shareModal={shareModal} CloseshareModal={CloseshareModal} setRefresh={setRefresh}/>
        </>
        :
        <h1 style={{display:"flex",alignItems:"stretch",justifyContent:"center"}}>404 Class Not Found</h1>
        }
        </>
        :
        <h1 style={{display:"flex",alignItems:"stretch",justifyContent:"center"}}>Please Login First To See Your Classes.</h1>
        }  
        
        </div>
    )
}
