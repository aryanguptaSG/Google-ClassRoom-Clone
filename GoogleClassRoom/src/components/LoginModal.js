import React,{useState} from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios"
export default function LoginModal({ Closelogin, login ,setislogin}) {
    const [email,setemail]=useState(null);
    const [pass,setpass]=useState(null);
    const [role,setrole]=useState('As a Student');
    const loginhandle=(e)=>{
        e.preventDefault()
        const data = {
            pass:pass,
             email:email
         }
        if(role==="As a Student"){
            axios.post("http://localhost:3001/login/s",data).then(result=>{
                console.log(result)
                localStorage.setItem("authToken",result.data.authToken)
                localStorage.setItem("islogin",result.data.auth)
                localStorage.setItem("Name",result.data.Name)
                localStorage.setItem("role",role)
                setislogin(true)
                
                Closelogin();

            })
            .catch(err=>{
                alert(err.message)
            })

        }
        else{
            axios.post("http://localhost:3001/login/t",data).then(result=>{
                console.log(result)
                localStorage.setItem("authToken",result.data.authToken)
                localStorage.setItem("islogin",result.data.auth)
                localStorage.setItem("Name",result.data.Name)
                localStorage.setItem("role",role)
                setislogin(true)
                Closelogin();

            })
            .catch(err=>{
                alert(err.message)
            })

        }

    }

    return (
        <Modal show={login} onHide={Closelogin}>
            <Modal.Header closeButton>
                <Modal.Title>Log In Now</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={loginhandle}>
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
                        <Form.Label>Select Role</Form.Label>
                        <Form.Control onChange={
                            (e)=>{setrole(e.target.value)}
                        }  required as="select">
                            <option>As a Student</option>
                            <option>As a Teacher</option>
                        </Form.Control>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={Closelogin}>
                        Close</Button>
                        <Button type="submit" variant="primary">
                        Log In Now </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>


    )
}
