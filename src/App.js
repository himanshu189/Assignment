// import logo from './logo.svg';
import "./App.css";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import Login from "./components/login";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Signup from "./components/signup";
import { useEffect, useState } from "react";
import Add from "./components/add";
import Home from "./components/home";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.isAuth);


  return (
    <div
      style={{
        backgroundImage: `url("back.jpg")`,
      }}
    >
      {console.log(isAuth, "--------------------------------------")}
      <ToastContainer />
      <BrowserRouter>
        {isAuth && <Navbar />}{" "} 
         {!isAuth ? <Redirect to="/login" /> : null}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/add"
            render={(props) => (
              <Add />
            )}
          />
          <Route
            path="/"
            render={(props) => <Home />}
          />
        </Switch>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
