import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
export default function useToken(){
    const [token,setToken]=useState
    
     const fetchToken=async()=>{
        const t=await AsyncStorage.getItem("userToken");
        setToken(t)
     }
     useEffect(() => {
       
        fetchToken()
     }, [])
     

    return token;

}