import React from "react";
import {View,Text,TouchableOpacity,Image,Animated} from "react-native"
import List from "./list";

export default function Card({route}) {
  const {sandhani,groupName,reg} = route.params
  console.log(sandhani)
  return (
    <TouchableOpacity key={sandhani?._id} activeOpacity={0.9} className="flex flex-col bg-white  rounded-lg m-2 shadow-lg  " style={{shadowColor:"red",shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.8, shadowRadius: 3}}>
      
              <Animated.View>         
              <View className="flex-col items-center">
              <View className="border rounded-full border-red-700 m-2" >
               <Image  className="w-20 m-2 h-20  rounded-full " source={{uri:sandhani?.imageUrl}}/>
              </View>
              <Text className="text-xl font-bold text-center ">{sandhani?.name}</Text>
              
              </View>
             <View className="flex-col w-full ">
                 {sandhani?.blood[0]?.amount? <List label={sandhani?.blood[0]?.groupName} value={sandhani?.blood[0]?.amount}/>:<List label={groupName} value="0"/>
                 
                 }
                 <List label="User" value={reg}/>
     
             </View>
             
             <TouchableOpacity >
             <Text className="mt-2 mb-2 text-red-700 text-center text-xl ">View more</Text>
            </TouchableOpacity>
            
            </Animated.View>
            
           </TouchableOpacity>
           
    )
}
