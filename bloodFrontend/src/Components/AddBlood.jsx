import {BiAddToQueue} from "react-icons/bi"
import React ,{useState}from "react";

import fetcher from "../utilis/Fetcher"
import {useMutation,useQueryClient,} from "@tanstack/react-query";
import URL from "../URL";

export default function AddBlood(props) {
  const queryClient=useQueryClient()
  const [blood,setBlood]=useState({name:"",amount:""})
  const handleChange=(e)=>{
    setBlood((prev)=>({...prev,[e.target.name]:e.target.value}))
    
  }
  
  const token =localStorage.getItem("loginToken");
    
  const mutation=useMutation((param)=>fetcher(URL+"/Addblood",{
       method:"POST",
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
    
    let send={name:blood.name,amount:blood.amount,sId:props.id};
    await mutation.mutate(send);
    setBlood((prev)=>({...prev,name:""}));
    setBlood((prev)=>({...prev,amount:""}));
  }
  
  
  
     return(
       <>
        <a  href="#my-modal-4" className="btn btn-primary absolute z-50 right-4 bottom-2 md:bottom-2/4">
         <BiAddToQueue class="text-2xl text-white"/>
        </a>
                                         <div className="modal" id="my-modal-4">
  <div className="modal-box flex flex-col items-center justify-center">
    <h3 className="font-bold text-lg text-center">Add Blood</h3>
     <form onSubmit={handleSubmit}>
     <input name="name"  type="text" placeholder="Enter blood group name" className="m-2 input input-bordered input-error w-full max-w-xs" onChange={handleChange} value={blood.name}  />
      <input name="amount" type="E-mail" placeholder="Enter blood amount" className="m-2 input input-bordered input-error w-full max-w-xs" value={blood.amount} onChange={handleChange} />
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