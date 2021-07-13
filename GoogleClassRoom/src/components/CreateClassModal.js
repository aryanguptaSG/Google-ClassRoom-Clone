import React,{useState} from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios"

export default function CreateClassModal({createclass,Closecreateclass}) {
    const [name,setname]=useState('')
    const [desc,setdesc]=useState('')
    const createNewClass=(e)=>{
        e.preventDefault()
        if(name.trim().length>0&&desc.trim().length>0){
            const data = {
                name:name,
                desc:desc,
                authToken: localStorage.getItem("authToken")
             }
             axios.post("http://localhost:3001/class/create",data).then(result=>{
                 alert("class is created and id is"+result.data._id)
             })
             .catch(err=>{
                 alert(err.message)
             })
        }
        else{
            alert("Please Enter Class Name to Create.")
        }

    }
    return (
        <Modal show={createclass} onHide={Closecreateclass}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={createNewClass}>
                    <Form.Group >
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control onChange={(e)=>{setname(e.target.value)}} required type="text" placeholder="Enter Class Name To Create" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={(e)=>{setdesc(e.target.value)}} required type="text" placeholder="Write Somthing About This Class." />
                    </Form.Group>
                   
                    <Modal.Footer>
                        <Button variant="secondary" onClick={Closecreateclass}>
                        Close</Button>
                        <Button type="submit" variant="primary" onClick={Closecreateclass}>
                        Create Now</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
