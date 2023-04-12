import React from "react"
import {AiFillDelete} from "react-icons/ai"
import fetcher from "../utilis/Fetcher"
import {useMutation,useQueryClient,} from "@tanstack/react-query";

export default function DeleteBloods({ids}) {
   const queryClient=useQueryClient()
  
    const token =localStorage.getItem("token");
    
  const mutation=useMutation((param)=>fetcher("http://localhost:3000/deletebloods",{
       method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify(param)
    }),{
      onSuccess:(data)=>{
        console.log(data)
         queryClient.invalidateQueries("bloods")
            
      }
    })
  
     const handleDelete=async()=>{
          const data={deletedBloods:ids}
          await mutation.mutate(data);
          
          
          
     }
     return (  <>
        <button onClick={handleDelete} className="btn btn-primary absolute z-50 right-4 bottom-2 md:bottom-2/4">

         <AiFillDelete class="text-2xl text-white"/>
   </button>


        </>
     
       )   
}