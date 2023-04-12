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
     const [blood,setBlood]=useState(null);
     
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
     const logout=()=>{
       AsyncStorage.removeItem("userToken")
       setToken((prev)=>null)
     }
     const getBlood=(blood)=>{
       
       const enc=encodeURIComponent(blood?.groupName);
      
       setBlood((prev)=>enc);
       
     }
     useEffect(()=>{
       isLogin()
     },[])
     return (
       <AuthContext.Provider value={{blood,getBlood,login,isLoading,token,logout}}>
       {children}
       </AuthContext.Provider>
       
       )
     
}