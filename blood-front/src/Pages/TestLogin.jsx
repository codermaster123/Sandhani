import React,{useState} from "react";
import Input from "../Components/Input";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {BsFillLockFill} from "react-icons/bs";

import Button from "../Components/BigButton";



export default function LoginUser() {
   const [input ,setInput]=useState({name:"",password:""});
  
  const handleChange=(e)=>{
       setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
      
  }
  
   const handleSubmit=async(e)=>{
       
       e.preventDefault();
       console.log("submitting")
      const res =await fetch("http://localhost:3000/login",{
        method:"POST",
          headers:{
        "Content-Type":"application/json"
      },
      
        body:JSON.stringify(input)
         
      })
      const token=await res.json();
      console.log(token);
      
      localStorage.setItem("token",token);
      
      setInput((prev)=>({...prev,name:""}));
      
      setInput((prev)=>({...prev,password:""}));
        
     
   }
   return(
  <>
    <div
        className="mt-20 w-full h-full flex flex-col
      items-center"
      >
    
     <form className="mt-4 space-y-2 " onSubmit={handleSubmit}>
      <h1>Enter Your Details</h1>
      <Input Icon={FaUserAlt} name="name" placeholder="Enter your Name" value={input.name} onChange={handleChange}  />
    
      <Input Icon={BsFillLockFill} name="password" placeholder="Enter your Name" value={input.password} onChange={handleChange}  />
      <Button name="Submit"/>
        
     </form>
    </div>
  </>
  )
}