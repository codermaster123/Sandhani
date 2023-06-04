import * as SplashScreen from 'expo-splash-screen';
import React,{useState,useEffect,useCallback} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";
import districtsData  from "./districts"
import upazilasData from "./upazilas"
export const AuthContext=React.createContext();

export const AuthProvider=({children})=>{
     const [token,setToken]=useState(null);
     const [isLoading,setLoading]=useState(true);
     const [blood,setBlood]=useState(null);
     const [welcomed,setWelcome]=useState(false);
     const [appReady,setAppready]=useState(false);
     const [isChecking,setIsChecking]=useState(true);
     const [districts,setDistricts]=useState([]);
     const [upazilas,setUpazilas]=useState([]);
     
    
    
     const login=async(token)=>{
       setLoading((prev)=>true);
       
       const t=await AsyncStorage.setItem("userToken",token);
       setToken((prev)=>token);
       setLoading((prev)=>false);
       
       
     }
     const start=async()=>{
         await AsyncStorage.setItem("welcome","Welcome");
         setWelcome((prev)=>true)
     }
     const isStart=async()=>{
       const t=await AsyncStorage.getItem("welcome");
       if(t){
         setWelcome((prev)=>true);
         
       }else{
         setWelcome((prev)=>false)
       }    
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
     const prepare=async()=>{
      await SplashScreen.preventAutoHideAsync();
      
       isStart();
      
       setAppready((prev)=>true);
       
     }
     const getData=async()=>{
       const res=await fetch("https://sandhanismmamcu.com/api/getLocation");
       const data=await res.json();
       districtsData[2].data.forEach((obj)=>{
         
         if(obj.id==data.districtId){
           const item={label:obj.bn_name,value:obj.name}
            setDistricts((prev)=>[...prev,item])
         }
         
       })
       
       
       
     }
     const setUpazilaDetails=(name)=>{
      const send=[]
      districtsData[2].data.forEach((obj)=>{
         
         if(obj.name==name){
       
               upazilasData[2].data.forEach((item)=>{
                  if(item.district_id==obj.id){
       
                    const data={label:item.bn_name,value:item.name};
                    send.push(data);
                    
                    
                  }
                 
            })
         }
         
       })
       return send;
       
       
     }
     useEffect(()=>{
       isLogin();
      // prepare()
      
       getData()
       console.log(districts)
      
     },[])
  
       if (isChecking) {
    return (
      <AppLoading
        startAsync={() => isStart()}
        onFinish={() => setIsChecking(false)}
        onError={console.warn}
      />
    );
  }
     return (
       <AuthContext.Provider value={{setUpazilaDetails,districts,start,welcomed,blood,getBlood,login,isLoading,token,logout}}>
       {children}
       </AuthContext.Provider>
       
       )
     
}