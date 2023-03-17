import React, { useState } from "react";
import { FaUserAlt ,FaCloudUploadAlt} from "react-icons/fa";

import { MdEmail,MdBloodtype } from "react-icons/md";
import {useNavigate} from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import Input from "../Components/Input"
import Submit from "../Components/BigButton"
import fetcher from "../utilis/Fetcher"

import {useMutation,useQueryClient,} from "@tanstack/react-query";


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
  
  
   const token=localStorage.getItem("token");
   
  const mutation=useMutation((param)=>fetcher("http://localhost:3000/AddSandhani", {
      method: "POST",
      headers:{
        "Authorization":`Bearer ${token}`
      },
      
      body: param,
    }),{
      onSuccess(data){
        console.log(data)
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
    await mutation.mutate(data)
    
    // const res = await fetch("http://localhost:3000/AddSandhani", {
    //   method: "POST",
    //   headers:{
        
    //     "Authorization":`Bearer ${token}`
    //   },
      
    //   body: data,
    // });
    // const response = await res.json();
    
    navigate("/mySandhani")
    
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
            className="flex flex-row   md:w-[520px] w-[320px] h-8 md:h-10"
          >
          
          <div className="relative bg-red-300 w-40 h-12 text-center flex flex-row items-center hover:bg-red-700 rounded-lg">
           <FaCloudUploadAlt className="text-white m-2 font-xl" />
          <h1 className="text-white">upload image</h1>
          </div>
          <input
          className="absolute w-20 mt-2 opacity-0"
          type="file"
          lable="Image"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />

          </div>
          <div className="relative top-4">
           <Submit name="Register"/>
         
          </div>
        </form>
      </div>
    </>
  );
}
