import {useState,useEffect} from "react"

export default  function useAuth() {
  
   const [auth,setAuth]=useState(true);
   useEffect(()=>{
        
    const token= localStorage.getItem("sandhaniToken");
    // setAuth((prev)=>{return true});
  
   },[])
   
   
  return auth;
}

