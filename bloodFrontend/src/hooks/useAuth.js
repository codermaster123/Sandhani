import {useState,useEffect,useContext} from "react"
import {AuthContext} from "../../Context/AuthContext";

export default  function useAuth() {
  
   const {sandhaniToken}=useContext(AuthContext);
   console.log("san "+sandhaniToken)
   
   if(sandhaniToken){
     return true;
     
   }else{
       return false;
   }
}

