import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import About from "../Pages/About";
import Login from "../Pages/Login";
import MySandhani from "../Pages/MySandhani";
import NewSandhani from "../Pages/createSandhani";
// import Test from "./Pages/Test";
// import Login from "./Pages/LoginUser"
// import TLogin from "./Pages/TestLogin"
// import Sandhani from "./Pages/Sandhani"

import PrivateRoute from "./Private";



function Router() {
  return (
    <div className="w-screen h-screen ">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/newsandhani" element={<NewSandhani/>}/>
        <Route element={<PrivateRoute/>}>
        
        <Route path="/mysandhani" element={<MySandhani/>}/>
        </Route>
        
      </Routes>
    </div>
  );
}

export default Router;
