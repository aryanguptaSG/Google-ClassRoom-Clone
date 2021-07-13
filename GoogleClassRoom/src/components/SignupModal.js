import React,{useState} from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios"
export default function SignupModal({ Closessignup, signup }) {
    const [name,setname]=useState(null);
    const [phone,setphone]=useState(null);
    const [email,setemail]=useState(null);
    const [pass1,setpass1]=useState(null);
    const [pass,setpass]=useState(null);
    const [role,setrole]=useState("As a Student");
    const signuphandle=(e)=>{
        e.preventDefault()
        if(pass!==pass1){
            alert("Please Fill Same Passwords.")
        }
        else{
            const data = {
                name:name,
                pass:pass,
                email:email,
                phone:phone,
                classes:[]
            }
            console.log(name,phone,email,pass,pass1,role)
            Closessignup();
            if(role==="As a Student"){
                axios.post("http://localhost:3001/signup/s",data).then(result=>{
                    console.log(result)
                    alert("SignUp Successfully")
                })
                .catch(err=>{
                    alert(err.message)
                })
            }
            else{
                axios.post("http://localhost:3001/signup/t",data).then(result=>{
                    console.log(result)
                    alert("SignUp Successfully")
                })
                .catch(err=>{
                    alert(err.message)
                })
            }
        } 
    }

    return (
        <Modal show={signup} onHide={Closessignup}>
            <Modal.Header closeButton>
                <Modal.Title>Register Now</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={signuphandle}>
                    <Form.Group>
                        <Form.Label>Enter Your Name</Form.Label>
                        <Form.Control onChange={
                            (e)=>{setname(e.target.value)}
                        } required type="text" placeholder="Enter Your Name" /><br />
                        <Form.Label>Enter Your Phone Number</Form.Label>
                        <Form.Control onChange={
                            (e)=>{setphone(e.target.value)}
                        }  required type="number" placeholder="Enter Your Phone Number" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={
                            (e)=>{setemail(e.target.value)}
                        }  required type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={
                            (e)=>{setpass(e.target.value)}
                        }  required type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control onChange={
                            (e)=>{setpass1(e.target.value)}
                        }  required type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Select Role</Form.Label>
                        <Form.Control onChange={
                            (e)=>{setrole(e.target.value)}
                        }  required as="select">
                            <option>As a Student</option>
                            <option>As a Teacher</option>
                        </Form.Control>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={Closessignup}>
                        Close</Button>
                        <Button type="submit" variant="primary">
                        Sign Up Now </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>


    )
}
