import React from 'react'
import { Card,Button,Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios"

export default function ClassCard({Title,Teacher,id,Desc}) {
  const removeclass = ()=>{
    const role = localStorage.getItem("role");
    if(role==="As a Student"){
      const data = {
        id:id,
        authToken :localStorage.getItem("authToken")
     }
      axios.put("http://localhost:3001/class/leave",data).then(result=>{
        alert(result.data.message)
      }).catch(err=>{
        console.log(err)
        alert(err)
      })
  }
  else{
    const data = {
      id:id,
      authToken :localStorage.getItem("authToken")
   }
    axios.put("http://localhost:3001/class/delete",data).then(result=>{
      alert(result.data.message)
    }).catch(err=>{
      console.log(err)
      alert(err)
    })
  }

  }
    return (
        <Card style={{ width: '20rem',margin:"20px"}}>
        <Image width="300px" src="./media/account.svg" alt="classphoto" fluid/>
    <Card.Body>
      <Card.Title>{Title}</Card.Title>
      <Card.Subtitle>{Teacher}</Card.Subtitle>
      <Card.Text>
        {Desc.substring(0,64)}{'...... '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      {/* <small className="text-muted">Last updated 3 mins ago</small> */}
      <Link to={{pathname:`/class/${id}`}}>
      <Button className="mx-3" variant="success">Go To Class</Button>
      </Link>
      <Button onClick={removeclass} className="mx-3" variant="danger">Remove</Button>
      
    </Card.Footer>
  </Card>
    )
}
