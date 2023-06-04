import {Outlet,Navigate} from "react-router-dom";

import React,{useState,useEffect,useContext} from "react";
import useAuth from "../hooks/useAuth"
import {AuthContext} from "../../Context/AuthContext";

export default function PrivateRoute() {
    // const [auth,setAuth]=useState(false)
    // const [wait,setWait]=useState(true);
    // const {sandhaniToken,isLoading}=useContext(AuthContext);
    // if(isLoading){
    //     return <h1>Loading</h1>
    // }
    // useEffect(()=>{
    //   console.log(sandhaniToken)
    //   if(sandhaniToken){
    //     setAuth((prev)=>true);
        
    //   }
    //   setWait((prev)=>false);
      
      
    // },[])
    
  // const auth=useAuth();
  // console.log(auth)
  const sandhaniToken=localStorage.getItem("sandhaniToken");
  
   
   return (
     <>
     { sandhaniToken==null && <Navigate to="/newsandhani"/> }
     {sandhaniToken &&<Outlet/>}
     
     </>
    ) 
}