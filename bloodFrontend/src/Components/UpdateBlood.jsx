
import React,{useState} from "react"
import {BiAddToQueue} from "react-icons/bi"

import fetcher from "../utilis/Fetcher"
import {useMutation,useQueryClient,} from "@tanstack/react-query";
import URL from "../URL";

export default function UpdateBlood({id}) {
        
    const queryClient=useQueryClient()
  
    const [input,setInput]=useState({name:"",amount:""});
     
  
  
  const token =localStorage.getItem("loginToken");
    
  const handleChange=(e)=>{

      setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
     
   }
   
    
   const mutation=useMutation((param)=>fetcher(`https://sandhanismmamcu.com/api/updateBlood/${id}`,{
       method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify(param)
    }),{
      onSuccess:(data)=>{
        queryClient.invalidateQueries("bloods")
        
      }
    })
  
  
  const handleSubmit=async(e)=>{
  
    e.preventDefault();
    
       await mutation.mutate(input);
    
    
  }
  
  
      return (
        <>
                <a  href="#my-modal-3" className="btn btn-ghost btn-xs">UPDATE
        </a>
                                         <div className="modal" id="my-modal-3">
  <div className="modal-box flex flex-col items-center justify-center">
    <h3 className="font-bold text-lg text-center">Update Blood</h3>
     <form className="flex flex-col" onSubmit={handleSubmit}>
     <input name="name"  type="text" placeholder="Enter blood group name" className="m-2 input input-bordered input-error w-full max-w-xs" onChange={handleChange} value={input.name}  />
      <input name="amount" type="text" placeholder="Enter blood amount" className="m-2 input input-bordered input-error w-full max-w-xs" value={input.amount} onChange={handleChange} />
        <button className="btn btn-sm py-2 px-8 ml-2 bg-red-700 hover:bg-red-800 text-white border-red-500 hover:border-red-500 ">Submit</button>
    
     </form>
    <div className="modal-action">
    </div>
     <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">✕</a>
    
  </div>
</div>

  </>
        
        )
}