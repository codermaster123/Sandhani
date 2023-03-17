import { createStackNavigator,CardStyleInterpolators,TransitionPresets } from '@react-navigation/stack';
import Login from "../Screen/Auth/Login"
import Registaton from "../Screen/Auth/Registation"
import SelectSandhani from "../Screen/Select"
import profile from "../Screen/Profile"
import Profile from '../Screen/Profile';
import {useEffect,useState,useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View,Text} from "react-native";
import LoadingIndicator from "../Components/LoadingIndicator"
import {AuthContext} from "../../Context";

const HStack=createStackNavigator();
export default function HomeStack() {
  console.log("render auth")
  const {isLoading,token}=useContext(AuthContext);
  
  // const [token,setToken]=useState();
  // const [loading ,setLoading]=useState(true);
  // const [firstScreen,setFristScreen]=useState("");
  
  // const setData=async()=>{
  //   const t=await AsyncStorage.getItem("userToken");
  
  //   console.log(t)
  //   setToken((prev)=>{return t})
    
  //   if(!t){
  //     setFristScreen("Registaton")
      
  //   }else{
  //       setFristScreen("Profile")
  //   }
  //   console.log(firstScreen)
  //   setLoading((prev)=>!prev);
    
  // }
  // useEffect(()=>{
  //     setData()
  // },[])
  
    if(isLoading){
        return <LoadingIndicator/>
      
    }
  return (
    
    <HStack.Navigator  screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,headerShown: false}}>
     
     {token==null ?
      
      <>
       <HStack.Screen name="Login" component={Login} /> 
      <HStack.Screen name="Registaton" component={Registaton} />
      </>
      :
      <HStack.Screen name="Profile" component={Profile} initialParams={{token }} />
      
     }
  	</HStack.Navigator>
      
    )
}