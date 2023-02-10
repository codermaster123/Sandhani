import { useState,useEffect } from "react";
import {AiFillEdit} from "react-icons/ai"

import fetcher from "../utilis/Fetcher"
import {useQuery} from "@tanstack/react-query";

import Blood from "./Blood"
function BloodDetail(props) {
	 const [bloods, setBloods] = useState();

   const [input,setInput]=useState({name:"",amount:""});
   
   const [allData,setAllData]=useState([]);
   
   const handleChange=(e)=>{
      console.log(bloods)
      setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
      setAllData((prev)=>[...prev,input])
     
   }
   
  const handleClick=()=>{
  	  setUp((prev)=>{
  	     return !prev;
  	    
  	  })
  }
  
  
  
  
  const token=localStorage.getItem("token");
      
  const {isLoading}=useQuery(["bloods"],()=>fetcher(`http://localhost:3000/getblood/${props.id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        
      },
    }),{
      onSuccess:(data)=>{
        setBloods((prev)=>{
      return data.bloodData;
    })
    
    
    
    
      }
    })
    if(isLoading){
	      return(<div className="w-full h-80  flex justify-center items-center">
	         <h1 className="md:text-2xl">No Blood details</h1>
	       </div>)
    }
  
	return (
	 
	    <>
	    <div className="bg-white-transparent">
	     		    
	     {bloods && bloods.map((blood)=>{
	     	
	     	return(
	     	<Blood key={blood._id} id={blood._id} name={blood.groupName} amount={blood.amount}/>
	     	)
	       
	     })}
	     
	     
	     
	   
	    </div>
	    </>
	
	)
}

export default BloodDetail;