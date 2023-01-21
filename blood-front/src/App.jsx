import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NewSondani from "./Pages/NewSondani";
import Test from "./Pages/Test";
import Login from "./Pages/LoginUser"
import TLogin from "./Pages/TestLogin"
import Sandhani from "./Pages/Sandhani"

import PrivateRoute from "./Private";


import Navbar from "./Components/Navbar";
function App() {
  return (
    <div className="h-screen w-screem bg-gradient-to-b from-white via-red-100 to-white bg-opacity-50 rounded-lg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login/>} />
        <Route path="/TLogin" element={<TLogin/>} />
          
      <Route  element={<PrivateRoute/>}>
           <Route path="/mySandhani" element={<Sandhani/>} />
         
       </Route>
       
          <Route path="/createSandhani" element={<NewSondani/>} />
         
      </Routes>
    </div>
  );
}

export default App;
