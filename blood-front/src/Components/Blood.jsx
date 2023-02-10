import React,{useState} from "react"
import {AiFillEdit,AiFillCheckCircle} from "react-icons/ai"
import fetcher from "../utilis/Fetcher"
import {useMutation,useQueryClient,} from "@tanstack/react-query";


export default function Blood({id,name,amount}) {
    const queryClient=useQueryClient()
  
    const [input,setInput]=useState({name:"",amount:""});
     
    const [toggle,setToggle]=useState(false);
    const handleEdit=()=>{
  	  setToggle((prev)=>{
  	     return !prev;
  	    
  	  })
  }
  
  const token =localStorage.getItem("token");
    
  const handleChange=(e)=>{

      setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
     
   }
   
    
   const mutation=useMutation((param)=>fetcher(`http://localhost:3000/updateBlood/${id}`,{
       method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify(param)
    }),{
      onSuccess:(data)=>{
        queryClient.invalidateQueries("bloods")
        
         setToggle((prev)=>!prev);
            
      }
    })
  
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
       await mutation.mutate(input);
    
    console.log("submit")
    
  }
  
  
    return(
      
      
	     		 <form onSubmit={handleSubmit}  className="flex flex-row justify-between items-center w-full border border-red-300">
	     		  { !toggle &&
	     		  <>
	     		  <div className="text-center border-r border-red-300 w-1/2">{name}</div>
	     		  <div className="text-center w-1/2">{amount}</div>
	     			<AiFillEdit className="text-4xl text-red-700 mr-8" onClick={handleEdit} />
	     		  </>
	     		    
	     		  }
	     		
	     		  { toggle && 
	     		    <div className="w-full flex">
	     		      <input name="name" className="text-center outline-none border-r border-red-300 w-1/2" type="text" value={input.name}  onChange={handleChange}/>
	     		      <input name="amount" className="text-center outline-none border-r border-red-300 w-1/2" type="text" vlaue={input.amount} onChange={handleChange} />
	     		     <button type="submit">
	     		     <AiFillCheckCircle className="text-4xl mr-4 text-red-700" />
	     		      </button>
	     		      </div>
	     		  
	     		  }
	     		 </form>
	     		 
      
      )
}
