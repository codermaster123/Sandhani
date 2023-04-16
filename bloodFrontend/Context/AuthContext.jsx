import React,{useState,useEffect} from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext=React.createContext();

export const AuthProvider=({children})=>{
     const [token,setToken]=useState(null);
     const [sandhaniToken,setSandhaniToken]=useState(null);
     
     const [isLoading,setLoading]=useState(true);
     const [user,setUser]=useState(null);
     
     const loginUser=(token)=>{
       const t= localStorage.setItem("loginToken",token);
       setToken((prev)=>token);
       setLoading((prev)=>false);
       
     }
     const isLogin=()=>{
         try {
              const t=localStorage.getItem("loginToken");
              const t2=localStorage.getItem("sandhaniToken");
                console.log("t "+t2)
              
              if(t){
              setToken((prev)=>t);
              }
              if(t2){
              setSandhaniToken((prev)=>t2);
              
              }
              
              setLoading((prev)=>false);
       
         } catch (e) {
           console.log(e)
         }
    
     }
     useEffect(()=>{
       isLogin()
       
     },[])
     return (
       <AuthContext.Provider value={{loginUser,isLoading,token,sandhaniToken}}>
       {children}
       </AuthContext.Provider>
       
       )
     
}
