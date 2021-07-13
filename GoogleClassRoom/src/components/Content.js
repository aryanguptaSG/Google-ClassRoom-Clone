import React,{useEffect,useState} from 'react'
import { Row,Image, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios"


export default function Content({material}) {
    const [SenderName, setSenderName] = useState(null)

    const timechange = (time24) =>{
        var ts = time24;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
      };

    useEffect(() => {
        axios.get(`http://localhost:3001/material/sender/${material.SenderId}`,{
                headers:{
                    "authToken":localStorage.getItem("authToken")
                }
            }).then(result=>{
                setSenderName(result.data.Name) 
                document.getElementById(`${material._id}`).innerHTML=`${material.Content.substring(0,300)}`;
            }).catch(err=>{
                console.warn(err)
            })
    }, [material])
    return (
        <>
        <Row className="m-3" style={{border:"2px solid #fff",boxShadow:"0px 0px 4px 0px gray",borderRadius:"10px",padding:"10px"}}>
            <Col xm={1}>
            <Image width="50px" height="50px" src="../media/account.svg" roundedCircle />
            </Col>

            <Col xs={11}> <h3>{SenderName}</h3> </Col>

            <Col className="my-3" xs={12}>
            <Link style={{textDecoration:"none",color:"#000"}} to={{pathname:`/Material/${material._id}`}}>
                <h5>{material.Title}</h5>
                </Link>
            </Col>

            <Col><p id={material._id}> k</p></Col>
           
            
            {material.Link?<Col xs={12}><a rel="noreferrer" target="_blank" href={material.Link}>Link attached</a></Col>:null}
            
            <Col xs={12}>{new Date(material.CreateDate).toLocaleDateString()+"  "+timechange(new Date(material.CreateDate).toLocaleTimeString())}</Col>
        </Row>
        </>
    )
}
