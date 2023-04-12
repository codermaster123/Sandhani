import React,{useState,useEffect} from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext=React.createContext();

export const AuthProvider=({children})=>{
     const [token,setToken]=useState(null);
     const [isLoading,setLoading]=useState(true);
     const [user,setUser]=useState(null);
     
     const login=async(token)=>{
       const t=await AsyncStorage.setItem("userToken",token);
       setToken((prev)=>token);
       setLoading((prev)=>false);
       
     }
     const isLogin=async()=>{
         try {
              const t=await localStorage.getItem("userToken");
              setToken((prev)=>t);
              setLoading((prev)=>false);
       
         } catch (e) {
           console.log(e)
         }
    
     }
     useEffect(()=>{
       isLogin()
     },[])
     return (
       <AuthContext.Provider value={{login,isLoading,token}}>
       {children}
       </AuthContext.Provider>
       
       )
     
}
