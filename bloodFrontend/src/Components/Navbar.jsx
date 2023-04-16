import React,{useState} from "react"
import {Link,useNavigate} from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import Router from "../Router";
import Login from "../Components/LoginModal";
import URL from "../URL";


export default function NavBar() {
  const [open,setOpen]=useState(false)
  const navigate=useNavigate();
  const [input ,setInput]=useState({name:null,email:null,password:null});
  const token=localStorage.getItem("sandhaniToken");
      
  const handleChange=(e)=>{
       
       setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
      
  }
  
  const handleSubmit=async(e)=>{
       
       e.preventDefault();
       console.log("submitting")
      const res =await fetch(URL+"/login",{
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
      //navigate("/TLogin")
     
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
      <div className="flex-none  lg:block">
           {/* The button to open modal */}
          
<a href="#my-modal-2" className="ml-4"><RiAccountCircleFill className="text-2xl"/>
          </a>
             <div className="modal" id="my-modal-2">
  <div className="modal-box flex flex-col items-center justify-center ">
    <h3 className="font-bold text-lg text-center">Login</h3>
    <form onSubmit={handleSubmit}>
     <input type="text" placeholder="Enter your Name" onChange={handleChange} value={input.name}  className="m-2 input input-bordered input-error w-full max-w-xs" />
      <input type="E-mail" placeholder="Enter your Email" onChange={handleChange} value={input.email} className="m-2 input input-bordered input-error w-full max-w-xs" />
     <input type="password" placeholder="Enter your password" onChange={handleChange} value={input.password} className="m-2 input input-bordered input-error w-full max-w-xs" />
      
    <div className="modal-action">
    <button className="btn btn-sm py-2 px-8 bg-red-700 hover:bg-red-800 text-white border-red-500 hover:border-red-500 ">Submit</button>
     <a href="#" className="btn btn-sm">close</a>
    </div>
    </form>
  </div>
</div>


      </div>
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
    {token&&<Link to="/mysandhani"><li className="li">My Sandhani</li></Link>}
      
      
    </ul>
    </div>
    
  </div>
</div>
    )
}