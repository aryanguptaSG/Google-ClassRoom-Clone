import React, { useState, useEffect } from 'react'
import NavbarComp from './components/NavbarComp'
import Home from "./components/Home"
import Material from "./components/Material"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ContentDisplay from './components/ContentDisplay';

function App() {
  const [islogin, setislogin] = useState(false);
  const [redirect, setredirect] = useState(false)
  useEffect(() => {
    const islogin = localStorage.getItem("islogin");
    if (islogin) {
      setislogin(true)
      setredirect(false)
    }
    else {
      setislogin(false)
      setredirect(true)
    }
  }, [islogin])
  return (
    <>
      <Router>
        <NavbarComp islogin={islogin} setislogin={setislogin} />
        <Switch>
          <Route exact path="/">
            <Home islogin={islogin} setislogin={setislogin} />
          </Route>
          <Route exact path="/class/:id">
            {redirect?<Redirect to="/" />:null}
            <Material islogin={islogin} />
          </Route>
          <Route exact path="/Material/:id">
            {redirect?<Redirect to="/" />:null}
            <ContentDisplay islogin={islogin} />
          </Route>
          <Route render={()=><Redirect to="/"/>}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
