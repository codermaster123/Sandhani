import React,{useState,useEffect} from "react";

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
     const loginSandhani=(token)=>{
       localStorage.setItem("sandhaniToken",token);
       setSandhaniToken((prev)=>token);
       setLoading((prev)=>false);
      
     }
     const login=(User,sandhai)=>{
        if(User){
        localStorage.setItem("loginToken",User);
        setToken((prev)=>User);
    
        }
        if(sandhai){
          localStorage.setItem("sandhaniToken",sandhai);
          setSandhaniToken((prev)=>sandhai);
       
        }
          setLoading((prev)=>false);
     
     }
     const isLogin=()=>{
         try {
              const t=localStorage.getItem("loginToken");
              const t2=localStorage.getItem("sandhaniToken");
              
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
       <AuthContext.Provider value={{login,loginSandhani,loginUser,isLoading,token,sandhaniToken}}>
       {children}
       </AuthContext.Provider>
       
       )
     
}
