// import React,{useMemo} from "react";
// import {io} from "socket.io-client"

// const SocketContext=React.createContext(null);

// export const useSocket=()=>{
//   return React.useContext(SocketContext);
   
// }

// export const SocketProvider=(props)=>{
  
//   const socket=useMemo(()=>{
//     io("http://localhost:5000/")
    
//   })
  
//   return(
//     <SocketContext.Provider value={{socket}}>
//           {props.children}
//     </SocketContext.Provider>
    
    
//     )
// }


import React,{useState,useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext=React.createContext();

export const AuthProvider=({children})=>{
     const [token,setToken]=useState(null);
     const [isLoading,setLoading]=useState(true);
     
     const login=async(token)=>{
       const t=await AsyncStorage.setItem("userToken",token);
       setToken((prev)=>token);
       setLoading((prev)=>false);
       
     }
     const isLogin=async()=>{
         try {
              const t=await AsyncStorage.getItem("userToken");
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