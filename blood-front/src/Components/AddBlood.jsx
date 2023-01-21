import React ,{useState}from "react";
import fetcher from "../utilis/Fetcher"
import {useMutation,useQueryClient,} from "@tanstack/react-query";

export default function AddBlood(props) {
  const queryClient=useQueryClient()
  const [blood,setBlood]=useState({name:"",amount:""})
  const handleChange=(e)=>{
    setBlood((prev)=>({...prev,[e.target.name]:e.target.value}))
    
  }
  
  const token =localStorage.getItem("token");
    
  const mutation=useMutation((param)=>fetcher("http://localhost:3000/Addblood",{
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
      <form className="w-full  bg-white-transparent" onSubmit={handleSubmit}> 
        <div className="w-full flex flex-row bg-white-transparent ">
        <input className="w-1/2 border-r border-red-500 outline-none" name="name" value={blood.name} onChange={handleChange} />
        <input className="w-1/2 outline-none" name="amount" value={blood.amount}  onChange={handleChange}/>
          </div>
      <button className="absolute right-2 mt-4 bg-red-500 text-white w-20 h-10 rounded-lg">Add</button>
    </form>
  )
}