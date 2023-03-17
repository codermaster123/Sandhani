import {useState,useEffect} from "react"
import {View,Text,Image,InteractionManager,ActivityIndicator} from "react-native";
import SmallButton from "../Components/SmallButton"
import LoadingIndicator from "../Components/LoadingIndicator"

import BloodDetails from "../Components/BloodDetails"
import User from "../Components/User"
export default function Details({navigation,route}) {
  console.log("card details")
  const [toggle,setToggle]=useState(1) 
  const [loading,setLoading]=useState(true);
  
  const {sandhani}=route.params;
  
    const onChange=(t)=>{
         
       setToggle((prev)=>t)
      
    }
        useEffect(()=>{
        InteractionManager.runAfterInteractions(()=>{
              setLoading((prev)=>!prev);
              
          
          
        })
    },[])
    if(loading){
          return <LoadingIndicator/>
    }

   return (
     <>
     <View className="w-full bg-white">
         <View className="flex-col items-center">
            <Image  className="mx-auto w-20 m-2 h-20  rounded-full " source={{uri:sandhani.imageUrl}}/>
              <Text className="text-xl font-bold text-center ">{sandhani?.name}</Text>
         </View>
         <View className="flex-row mt-4  pb-2 w-full border-dashed border-b">
               <View className="flex-col w-1/2">
                <Text className="text-center">current blood</Text>
                <Text className="text-center">{sandhani.amount}</Text>
                </View>
                <View className="flex-col w-1/2">
                <Text className="text-center">blood donar</Text>
                <Text className="text-center">{sandhani.amount}</Text>
                </View>
                
                
             </View>
            <View className="w-full flex-row">
              <View className="w-1/2"><SmallButton name="Blood" onClick={()=>onChange(1)}/></View>
             
             <View className="w-1/2"><SmallButton name="Donar" onClick={()=>onChange(2)}/></View>
            
            </View>
            <View>
            
            </View>
             
     </View>
       {toggle==1 &&<BloodDetails sId={sandhani._id}/>}
       {toggle==2 &&<User/>}
      
    </>   
     )
}