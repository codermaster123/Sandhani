import React from "react"
import {AiFillDelete} from "react-icons/ai"
import fetcher from "../utilis/Fetcher"
import {useMutation,useQueryClient,} from "@tanstack/react-query";
import URL from "../URL";

export default function DeleteBloods({ids,afterDelete}) {
   const queryClient=useQueryClient()
  
    const token =localStorage.getItem("loginToken");
    
  const mutation=useMutation((param)=>fetcher("https://sandhanismmamcu.com/api/deletebloods",{
       method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify(param)
    }),{
      onSuccess:(data)=>{
        console.log(data)
          afterDelete()
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