import React, { useEffect ,useState} from 'react'
import {
    useParams
  } from "react-router-dom";
import axios from "axios";
import { Row,Image, Col} from 'react-bootstrap';

export default function ContentDisplay({islogin}) {
    const { id } = useParams()
    const [Material, setMaterial] = useState()
    const [SenderName, setSenderName] = useState(null);

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
        axios.get(`http://localhost:3001/material/wholematerial/${id}`,{
                headers:{
                    "authToken":localStorage.getItem("authToken")
                }
            }).then(result=>{
                // console.log(result.data);
                setMaterial(result.data)
            }).catch(err=>{
                console.warn(err)
            });
            
    },[id])
    if(Material){
    axios.get(`http://localhost:3001/material/sender/${Material.SenderId}`,{
                headers:{
                    "authToken":localStorage.getItem("authToken")
                }
            }).then(result=>{
                setSenderName(result.data.Name) 
                document.getElementById(`${Material._id}`).innerHTML=`${Material.Content}`;
            }).catch(err=>{
                console.warn(err)
            })
        }
    return (
        <div style={{position:"relative",top:"100px"}}>
        {islogin?
        <>
        {Material?
        <>
        <Row className="m-3" style={{border:"2px solid #fff",boxShadow:"0px 0px 4px 0px gray",borderRadius:"10px",padding:"10px"}}>
            <Col xm={1}>
            <Image width="50px" height="50px" src="../media/account.svg" roundedCircle />
            </Col>

            <Col xs={11}> <h3>{SenderName}</h3> </Col>

            <Col className="my-3" xs={12}><h5>{Material.Title}</h5></Col>

            <Col xs={12}><p id={Material._id}> k</p></Col>
           
            {Material.MediaType==="Image"?<Col xs={12}><Image fluid src={Material.MediaUrl}/></Col>:null}

            {Material.MediaType==="Video"?<Col xs={12}><video width="600px" src={Material.MediaUrl} controls/></Col>:null}

            {Material.MediaType==="Pdf"?<Col xs={12}>
            <embed src={Material.MediaUrl} type="application/pdf" width="80%" height="800px"/>
            
            </Col>:null}
            
            {Material.Link?<Col xs={12}><a rel="noreferrer" target="_blank" href={Material.Link}>Link attached</a></Col>:null}
            
            <Col xs={12}>{new Date(Material.CreateDate).toLocaleDateString()+"  "+timechange(new Date(Material.CreateDate).toLocaleTimeString())}</Col>
        </Row>
        
        </>
        :<h1 style={{display:"flex",alignItems:"stretch",justifyContent:"center"}}>No Material To Show</h1>}
        </>
        :
        <h1 style={{display:"flex",alignItems:"stretch",justifyContent:"center"}}>Please Login First To See Your Classes.</h1>}
        </div>
        
    )
}
