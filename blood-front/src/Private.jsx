import {Outlet,Navigate} from "react-router-dom";

import React,{useState,useEffect} from "react";
import useAuth from "./hooks/useAuth"
// import useAuth from "./hooks/useTest"

export default function PrivateRoute() {
   
   const auth=useAuth();
   return auth ? <Outlet/>:<Navigate to="/createSandhani"/>;
}