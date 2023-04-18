import React, { useState } from "react";
import { FaUserAlt ,FaCloudUploadAlt} from "react-icons/fa";

import { MdEmail,MdBloodtype } from "react-icons/md";
import {useNavigate} from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import Input from "../Components/Input"
// import Submit from "../Components/BigButton"
import fetcher from "../utilis/Fetcher"

import {useMutation,useQueryClient,} from "@tanstack/react-query";
import URL from "../URL";


export default function Comp() {
  const [name, setName] = useState();
  const [input,setInput]=useState({name:"",email:"",address:"",amount:""});
  const [postImage, setPostImage] = useState(null);
  
const navigate=useNavigate();

  const handleChange=(e)=>{
       setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
  }
  const handleFileUpload = (e) => {
    setPostImage(e.target.files[0]);
  };
  
  
   const token=localStorage.getItem("loginToken");
   
  const {mutate,isError}=useMutation((param)=>fetcher("http://43.205.172.73/api/AddSandhani", {
      method: "POST",
      headers:{
        "Authorization":`Bearer ${token}`
      },
      
      body: param,
    }),{
      onSuccess(data){
        console.log(data)
        localStorage.setItem("sandhaniToken",data.token);
        navigate("/mysandhani")
      
      
      },
      onError(e){
          console.log("error")
      }
      
    })
    
    
  const handleSubmit=async(e)=>{
    e.preventDefault();
      
  
    const data = new FormData();
    
    data.append("name", input.name);
    data.append("email",input.email);
    data.append("address",input.address);
    data.append("amount",input.amount)
    data.append("Sandhani", postImage);
    await  mutate(data)
    
  }
  
  return (
    <>
      <div
        className="mt-20 w-full h-full flex flex-col
      items-center"
      >
      
        <h1 className="mt-20 md:text-6xl text-center text-4xl">Register your Sandhani</h1>
        <form className="mt-4 space-y-2  " onSubmit={handleSubmit}>
          <Input name="name" placeholder="Enter the Samdhani Name" Icon={FaUserAlt} value={input.name} onChange={handleChange} />
          <Input name="email" placeholder="Enter your Email" Icon={MdEmail} value={input.email}  onChange={handleChange}/>
          <Input name="address" placeholder="Enter  your address(must add dristict)" Icon={AiFillHome} value={input.address} onChange={handleChange}/>
          <Input name="amount" placeholder="Enter the amount" Icon={MdBloodtype} value={input.amount} onChange={handleChange} />
         <div
            className="flex flex-row"
          >
        
        <input type="file" onChange={(e) => handleFileUpload(e)}
           className="file-input  file-input-bordered file-input-primary file-input-md w-full max-w-xs" />

          </div>
          
              <button className="btn btn-primary  btn-wide w-full text-base-100">Create</button>
          
        </form>
        
      </div>
      {isError && <div className="alert alert-error shadow-lg">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Error! Task failed successfully.</span>
  </div>
</div>}
    </>
  );
}
