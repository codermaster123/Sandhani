import React,{useState} from "react";
import Input from "../Components/Input";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {BsFillLockFill} from "react-icons/bs";
import fetcher from "../utilis/Fetcher"
import {useMutation,useQueryClient,} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

import Button from "../Components/BigButton";



export default function LoginUser() {
   const [input ,setInput]=useState({name:"",password:""});
  const [close,setClose]=useState(false)
  const handleChange=(e)=>{
       setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
      
  }
  const navigate=useNavigate();
  const {isError,mutate,isLoading}=useMutation((param)=>fetcher("http://localhost:3000/login",{
       method:"POST",
      headers:{
        "Content-Type":"application/json",
        
      },
      body:JSON.stringify(param)
    }),{
      onSuccess:(data)=>{
         
            localStorage.setItem("token",data);
           navigate("/mySandhani")
        
      },
      onError:(err)=>{
        
        setClose(false)
        // console.log(e)
      }
      
    })
    
  
   const handleSubmit=async(e)=>{
       
       e.preventDefault();
       await mutate(input);
    
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
    
      <Input Icon={BsFillLockFill} name="password" placeholder="Enter your password" value={input.password} onChange={handleChange}  />
      <Button name="Submit"/>
        
     </form>
     {isError &&
     <div className={`fixed bottom-0 ${close? "hidden":"inline"}`}>
          <div id="toast-danger" class="flex items-center w-full max-w-xs p-4  mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">Authentication failed.</div>
    <button type="button" onClick={()=>setClose(true)} class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
        <span class="sr-only" >Close</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
</div>
</div>
     }
    </div>
  </>
  )
}