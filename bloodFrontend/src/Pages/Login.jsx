import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

import Input from "../Components/Input";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {BsFillLockFill} from "react-icons/bs";
import URL from "../URL";

// import Button from "../Components/BigButton";


import {
  useQuery,
  useMutation,
  useQueryClient,
  
} from '@tanstack/react-query';


export default function LoginUser() {
   const [input ,setInput]=useState({name:"",email:"",password:""});
  const navigate=useNavigate();
  
  const handleChange=(e)=>{
       setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
      
  }
  
  
  // const  {data,isLoading}=useQuery(["search",input],()=>fetcher(`http://localhost:3000/search?q=${input}`),{
      
  //     refetchOnWindowFocus: false,
  //     enabled:true,
  //     onSuccess(data){
        
        
  //     }
      
  //   })
    
  
   const handleSubmit=async(e)=>{
       
       e.preventDefault();
       console.log("submitting")
      const res =await fetch("http://localhost:3000/register",{
        method:"POST",
          headers:{
        "Content-Type":"application/json"
      },
      
        body:JSON.stringify(input)
         
      })
      const data=await res.json();
      console.log(data);
       
      setInput((prev)=>({...prev,name:""}));
      setInput((prev)=>({...prev,email:""}));
      setInput((prev)=>({...prev,password:""}));
      navigate("/TLogin")
     
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
      <Input type="password" Icon={MdEmail} name="email" placeholder="Enter your E-mail" value={input.email} onChange={handleChange}  />
      <Input Icon={BsFillLockFill} name="password" placeholder="Enter your password" value={input.password} onChange={handleChange}  />
        
     </form>
    </div>
  </>
  )
}