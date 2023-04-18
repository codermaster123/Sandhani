import React,{useState} from "react";
import img1 from "../assets/img.png";
// import useAuth from "../hooks/useAuth"
import {Link,useNavigate} from "react-router-dom";
import URL from "../URL";

export default function Home() {
// 	const t=useAuth();
		
	
// 	const handle=()=>{
		
// 		console.log(t)
// 	}
 const [input ,setInput]=useState({name:"",email:"",password:""});
 const navigate=useNavigate();
 
  const handleChange=(e)=>{
       
       setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
      
  }
  
  const handleSubmit=async(e)=>{
      e.preventDefault();
       console.log("submitting")
      const res =await fetch("http://43.205.172.73/api/register",{
        method:"POST",
          headers:{
        "Content-Type":"application/json"
      },
      
        body:JSON.stringify(input)
         
      })
      const data=await res.json();
      console.log(data);
       localStorage.setItem("loginToken",data.token);
      
      setInput((prev)=>({...prev,name:""}));
      setInput((prev)=>({...prev,email:""}));
      setInput((prev)=>({...prev,password:""}));
      navigate("/newsandhani")
      
    
  }
	
  return (
    <>
  
      <div className="flex flex-col h-full mt-20">
        <img class="" src={img1} alt="" />
        <h1 className="md:tracking-widest  text-center font-title text-2xl md:text-6xl font-bold">
          Sandhani is a blood bank organization
        </h1>
        <div className="w-full flex justify-center items-center mt-2">
       <a href="#my-modal-10" className="hover:bg-red-800  bg-red-700 w-20 text-center text-white rounded-md py-2">start
          </a>
             <div className="modal" id="my-modal-10">
  <div className="modal-box flex flex-col items-center justify-center ">
    <h3 className="font-bold text-lg text-center">Sign up</h3>
    <form onSubmit={handleSubmit}>
     <input type="text" placeholder="Enter your Name" onChange={handleChange} value={input.name} name="name" className="m-2 input input-bordered input-error w-full max-w-xs" />
      <input type="E-mail" placeholder="Enter your Email" onChange={handleChange} value={input.email} name="email" className="m-2 input input-bordered input-error w-full max-w-xs" />
     <input type="password" placeholder="Enter your password" onChange={handleChange} value={input.password} name="password" className="m-2 input input-bordered input-error w-full max-w-xs" />
      
    <div className=" flex flex-col ">
    <p className="mx-2">if you have an account <a href="#my-modal-2" className="text-red-500">click here </a> </p>
    <div className="modal-action flex flex-row">
    <button className="btn btn-sm py-2 px-8 bg-red-700 hover:bg-red-800 text-white border-red-500 hover:border-red-500 ">Submit</button>
     <a href="#" className="btn btn-sm">close</a>
     </div>
    </div>
    </form>
  </div>
</div>
</div>
      </div>
      
    </>
  );
}
