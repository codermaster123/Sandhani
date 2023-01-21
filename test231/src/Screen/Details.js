import {useState} from "react"
import {View,Text,Image} from "react-native";
import SmallButton from "../Components/SmallButton"

import BloodDetails from "../Components/BloodDetails"
export default function Details({navigation,route}) {
  const [toggle,setToggle]=useState(0) 
  const {sandhani}=route.params;
  
    const onChange=(t)=>{
         
       setToggle((prev)=>t)
      
    }
    
   return (
     <>
     <View className="w-full bg-white">
         <View className="flex-col items-center">
            <Image  className="mx-auto w-20 m-2 h-20 border-2 border-red-700 rounded-full " source={{uri:sandhani.imageUrl}}/>
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
             
             <View className="w-1/2"><SmallButton name="user" onClick={()=>onChange(2)}/></View>
            
            </View>
            <View>
            
            </View>
             
     </View>
       <BloodDetails sId={sandhani._id}/>
    </>   
     )
}