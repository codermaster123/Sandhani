import {Outlet,Navigate} from "react-router-dom";

import React,{useState,useEffect} from "react";
import useAuth from "../hooks/useAuth"

export default function PrivateRoute() {
   
   const auth=useAuth();
   console.log(auth)
   
   return auth ? <Outlet/>:<Navigate to="/newsandhani"/>;
}