import test from "../assets/test.jpg";

import ToggleBar from "../Components/ToggleBar"
import fetcher from "../utilis/Fetcher"

import {useState,useEffect} from "react";
import {useQuery} from "@tanstack/react-query"

function Sandhani() {
  const [sandhani,setSandhani]=useState()
  const [blood,setBlood]=useState(null);
  const [toggle,setToggle]=useState()
  const [bd,setBd]=useState(false)
  
   const changeToggle=(index)=>{
       setToggle((prev)=>{
          return index;
       })
   }
   
   const showDetails=()=>{
      setBd((prev)=>{
        
         return !prev;
         
      })
   }
  const token=localStorage.getItem("token");
      
  const {data}=useQuery(["sandhani"],()=>fetcher("http://localhost:3000/Sandhani",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
    }),{
      onSuccess:(data)=>{
         
        setSandhani((prev)=>{
          return data.sandhani
        })
      }
      
    })
  
   
  return (
    <div className="mt-20 bg-white-transparent  w-full">
      <div className="shadow-xl">
      
      <div className="flex flex-col">
        <img
          className="mx-auto my-2 w-20 h-20 rounded-full  border-2 border-red-500"
          src={sandhani?.imageUrl}
        />
        <h1 className="text-center text-2xl">{sandhani?.name}</h1>
      </div>
      
        <div className="flex justify-around m-2 mt-8 items-center 
         text-center">
          <div className={` w-1/3 text-center p-2 border-r border-red-500 ${toggle==1?"border-b-2 border-red-500 bg-red-300 text-white":""}`}><button onClick={()=>changeToggle(1)} className="text-xl">Blood Detail</button></div>
          <div className={`w-1/3 text-center p-2 border-r border-red-500 ${toggle==2?"border-b border-red-500 bg-red-300 text-white":""}`}><button onClick={()=>changeToggle(2)}>User</button></div>
          <div className={`w-1/3  p-2 ${toggle==3?"border-b border-red-500 bg-red-300 text-white":""}`}><button o>Sandhani details</button></div>
        </div>
        </div>
        <div className="mt-4">
         <div className={`flex justify-around p-2 ${toggle==1?"block":"hidden"}`}>
          <ToggleBar id={sandhani?._id} bloods={blood}/>
         </div>
      </div>
      
    </div>
  );
}
export default Sandhani;
