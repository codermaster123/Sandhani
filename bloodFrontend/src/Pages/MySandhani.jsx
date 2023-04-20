import fetcher from "../utilis/Fetcher"
import {useState,useEffect} from "react";
import {useQuery} from "@tanstack/react-query"
import BloodList from "../Components/BloodList"
import AddBlood from "../Components/AddBlood"
import url from "../URL";

function Sandhani() {
  const [sandhani,setSandhani]=useState()
  const [blood,setBlood]=useState(null);
  const [toggle,setToggle]=useState(0)
  const [loading,setLoading]=useState(true);
  
   const changeToggle=(index)=>{
       setToggle((prev)=>{
          return index;
       })
   }
   
   
  const token=localStorage.getItem("loginToken");
      
  const {data,isLoading}=useQuery(["sandhani"],()=>fetcher("https://sandhanismmamcu.com/api/Sandhani",{
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
        setLoading((prev)=>!prev);
        
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
      <div className="flex justify-center items-center">
        <ul className="menu menu-horizontal bg-base-100 rounded">
  <li onClick={()=>changeToggle(1)}><a className="hover:active hover:text-white" >Blood</a></li>
  <li onClick={()=>changeToggle(2)}><a className="hover:active hover:text-white">Add Blood</a></li>
  <li onClick={()=>changeToggle(3)}><a className="hover:active hover:text-white">User</a></li>
</ul>
        </div>
        </div>
        
       { toggle==1 && <BloodList id={sandhani?._id}/>}
       
        
    </div>
  );
}
export default Sandhani;
