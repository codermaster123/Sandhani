import React,{useState} from "react"
import {Link,useNavigate} from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";

export default function NavBar() {
  const [open,setOpen]=useState(false)
  const navigate=useNavigate();
  
  
  return (
    <nav className="bg-white top-0 p-5 md:flex fixed w-full md:flex-row md:justify-between md:items-center border-b">
       <div className="flex justify-between items-center text-2xl font-Arvo">
         <div>
         <span className="text-red-700">Sand</span>
         <span>hani</span>
         </div>
         { open ? <AiOutlineClose className="mx-2 cursor-pointer md:hidden block text-3xl" onClick={()=>setOpen(!open)}/>:<HiOutlineMenu onClick={()=>setOpen(!open)} className="mx-2 text-3xl cursor-pointer md:hidden block" />}
       </div>
       
        <ul   className={`border-t md:border-none md:flex  md:flex-row md:space-x-7 z-[-1] z-auto md:static fixed w-full bg-white left-0 md:w-auto md:py-0 py-2 md:pl-0 pl-7 md:opacity-100  bg-white transition-all ease-in duration-300 ${open? "top-[70px] opacity-100":"top-[-350px] opacity-0"}`}>
         <li className="mx-2 my-4 md:my-0 text-red-700 text-xl hover:font-bold"><Link to="/">Home</Link></li>
         <li className="mx-2 my-4 md:my-0 text-red-700 text-xl hover:font-bold"><Link to="/about">About</Link></li>
         <li className="mx-2 my-4 md:my-0 text-red-700 text-xl hover:font-bold"><Link to="/Contact">Contact</Link></li>
         <button className="bg-red-700 rounded-lg text-white w-20 h-10" onClick={()=>navigate("/login")}>Login</button>
        </ul>
    </nav>
    
    )
}