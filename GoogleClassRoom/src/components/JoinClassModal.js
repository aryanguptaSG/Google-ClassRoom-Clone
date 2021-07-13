import React,{useState} from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";
export default function JoinClassModal({joincalss,Closejoinclass}) {
    const [classid,setclassid]=useState('')
    const JoinNewClass = (e)=>{
        e.preventDefault();
        if(classid.trim().length>0){
            const data = {
                id:classid,
                authToken:localStorage.getItem("authToken")
             }
             Closejoinclass()
             axios.post("http://localhost:3001/class/join",data).then(result=>{
                 alert(result.data.message)
             })
             .catch(err=>{
                 alert(err.message)
             })
        }
        else{
            alert("Please Fill The Class Id .")
        }
    }
    return (
        <Modal show={joincalss} onHide={Closejoinclass}>
        <Modal.Header closeButton>
            <Modal.Title>Join New Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={JoinNewClass} >
                <Form.Group >
                    <Form.Label>Class Code</Form.Label>
                    <Form.Control onChange={(e)=>{
                        setclassid(e.target.value)
                    }} required type="text" placeholder="60c1d3ba7aebd8f7ec3fc383" />
                </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={Closejoinclass}>
                    Close</Button>
                    <Button type="submit" variant="primary">
                    Join Now</Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>
    </Modal>
    )
}
