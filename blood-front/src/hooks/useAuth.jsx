import {useState} from "react"
import useSWR from "swr";
import fetcher from "../utilis/Fetcher"


const URL = "http://localhost:3000/Sandhani";
const token = localStorage.getItem("token");
const dep= {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }

export default  function useAuth() {
  
   const [auth,setAuth]=useState(true);
   
   //const {data,error}=useSWR(URL,dep,fetcher)
   //if(data._id){
   //	 setAuth((prev)=>!prev)
   //}
   
   
   
   
  return auth;
}

