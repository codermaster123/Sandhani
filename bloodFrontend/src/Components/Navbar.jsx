import React,{useState,useContext} from "react"
import {Link,useNavigate} from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import Router from "../Router";
import URL from "../URL";
import {useQuery} from "@tanstack/react-query"
import fetcher from "../utilis/Fetcher"
import {AuthContext} from "../../Context/AuthContext";


export default function NavBar() {
  const [open,setOpen]=useState(false)
  const navigate=useNavigate();
  const [input ,setInput]=useState({name:"",email:"",password:""});
  const [sandhani,setSandhani]=useState(false);
  const token=localStorage.getItem("loginToken");
  const {login,sandhaniToken}=useContext(AuthContext);
 
  const handleChange=(e)=>{
       
       setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
      
  }
  // const {data,isLoading}=useQuery(["checksandhani",token],()=>fetcher("https://sandhanismmamcu.com/api/Sandhani",{
  //     method:"GET",
  //     headers:{
  //       "Content-Type":"application/json",
  //       "Authorization":`Bearer ${token}`
  //     },
  //   }),{
  //     onSuccess:(data)=>{
  //       if(data.sandhani){
  //         setSandhani((prev)=>{
  //         return true })
  //         localStorage.setItem("sandhaniToken",data.sandhani._id);
        
  //     }
        
        
  //     }
      
  //   })
  
  const handleSubmit=async(e)=>{
       
       e.preventDefault();
       console.log("submitting")
      const res =await fetch("https://sandhanismmamcu.com/api/login",{
        method:"POST",
          headers:{
        "Content-Type":"application/json"
      },
      
        body:JSON.stringify(input)
         
      })
      const data=await res.json();
      console.log(data.user[0]?.sandhani);
      if(data.token||data.user[0]?.sandhani){
          login(data.token,data.user[0]?.sandhani)
          setSandhani((prev)=>true)
      }
      
      setInput((prev)=>({...prev,name:""}));
      setInput((prev)=>({...prev,email:""}));
      setInput((prev)=>({...prev,password:""}));
      //navigate("/TLogin")
      navigate("/mysandhani")
     
   }
   
  return (
         <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">
    
    <div className="w-full navbar bg-white border-b border-red-50">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div className="flex-1 px-2 mx-2 text-xl">
      <span className="text-red-700">Sand</span>
      <span className="text-black">hani</span>
      </div>
      {!token&&<div className="flex-none  lg:block">
           {/* The button to open modal */}
          
<a href="#my-modal-2" className="ml-4"><RiAccountCircleFill className="text-2xl"/>
          </a>
             <div className="modal" id="my-modal-2">
  <div className="modal-box flex flex-col items-center justify-center ">
    <h3 className="font-bold text-lg text-center">Login</h3>
    <form onSubmit={handleSubmit}>
     <input type="text" name="name" placeholder="Enter your Name" onChange={handleChange} value={input.name}  className="m-2 input input-bordered input-error w-full max-w-xs" />
      <input type="E-mail" name="email" placeholder="Enter your Email" onChange={handleChange} value={input.email} className="m-2 input input-bordered input-error w-full max-w-xs" />
     <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} value={input.password} className="m-2 input input-bordered input-error w-full max-w-xs" />
      
    <div className="modal-action">
    <button className="btn btn-sm py-2 px-8 bg-red-700 hover:bg-red-800 text-white border-red-500 hover:border-red-500 ">Submit</button>
     <a href="#" className="btn btn-sm">close</a>
    </div>
    </form>
  </div>
</div>


      </div>}
    </div>
    
       <Router/>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
    <div className="flex-1 bg-white w-80">
       <div className="p-2 border-b border-red-50 text-2xl ">
           <span className="text-red-700">Sand</span>
           <span>hani</span>
     
    </div>
    <ul className="flex-1 p-6 w-80 space-y-2 bg-white">
    
      <Link  to="/"><li className="li">Get Started</li></Link>
      <Link to="/about"><li className="li">About</li></Link>
    {sandhaniToken&&<Link to="/mysandhani"><li className="li">My Sandhani</li></Link>}
      
      
    </ul>
    </div>
    
  </div>
</div>
    )
}