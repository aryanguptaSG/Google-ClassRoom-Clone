import React, { useState,useEffect} from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import SignupModal from "./SignupModal"
import LoginModal from "./LoginModal"
import JoinClassModal from "./JoinClassModal"
import CreateClassModal from "./CreateClassModal"
import { Link } from 'react-router-dom';

export default function NavbarComp({islogin,setislogin}) {
    const [signup, setsignup] = useState(false);
    const [login, setlogin] = useState(false);
    const [role,setrole] = useState(true);
    const [joincalss, setjoinclass] = useState(false);
    const [createclass,setcreateclass] = useState(false);
    const Closessignup = () => setsignup(false);
    const Showsignup = () => setsignup(true);
    const Closelogin = () => setlogin(false);
    const Showlogin = () => setlogin(true);
    const Closecreateclass = () => setcreateclass(false);
    const Showcreateclass = () => setcreateclass(true);
    const Closejoinclass = () => setjoinclass(false);
    const Showjoinclass = () => setjoinclass(true);

    const handlelogout = ()=>{
        localStorage.removeItem("islogin");
        localStorage.removeItem("role");
        localStorage.removeItem("authToken");
        localStorage.removeItem("Name");
        setislogin(false)
    }
    useEffect(()=>{
        var role = localStorage.getItem("role");
        if(role==="As a Student"){
            setrole(true)
        }
        else{
            setrole(false)
        }
    },[islogin])
    

    return (
        <>
            <Navbar fixed="top" bg="light" expand="lg">
                <Link to="/">
                <Navbar.Brand >Google ClassRoom</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {!islogin?
                        <>
                            <Button variant="primary" className="mr-3 my-3" onClick={Showsignup}>Sign Up</Button>
                        <Button variant="primary" className="my-3 mr-3 "  onClick={Showlogin}>Log In</Button></>
                        :
                        <>
                        <Navbar.Brand className="my-3 mr-3 ">{`Hi ${localStorage.getItem("Name")} !`}</Navbar.Brand>
                            {role?
                            <Button variant="primary" className="my-3 mr-3 " onClick={Showjoinclass}>Join New Class</Button>
                            :
                            <Button variant="primary" className="my-3 mr-3 " onClick={Showcreateclass}>Create New Class</Button>}
                        <Button variant="primary" className="my-3 mr-3 " onClick={handlelogout}>Log Out</Button>
                        </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <SignupModal signup={signup} Closessignup={Closessignup}/>
            <LoginModal login={login} Closelogin={Closelogin} setislogin={setislogin}/>

            <JoinClassModal joincalss={joincalss} Closejoinclass={Closejoinclass}/>
            <CreateClassModal createclass={createclass} Closecreateclass={Closecreateclass} />
        </>
    )
}
