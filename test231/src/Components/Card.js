import React from "react";
import {View,Text,TouchableOpacity,Image,Animated} from "react-native"

export default function Card({sandhani,onClick}) {
  
  
  return (
    <TouchableOpacity key={sandhani?._id} activeOpacity={0.9} className="flex flex-col bg-white  rounded-lg m-2 shadow-lg  " style={{shadowColor:"red",shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.8, shadowRadius: 3}}>
      
              <Animated.View>         
              <View className="flex-row items-center">
              <View className="border rounded-full border-red-700 m-2" >
               <Image  className="w-20 m-2 h-20 border-2 border-red-300 rounded-full " source={{uri:sandhani.imageUrl}}/>
              </View>
              <Text className="text-xl font-bold text-center ">{sandhani?.name}</Text>
              
              </View>
             <View className="flex-row w-full border-b">
               <View className="flex-col w-1/2">
                <Text className="text-center">current blood</Text>
                <Text className="text-center">{sandhani.amount}</Text>
                </View>
                <View className="flex-col w-1/2">
                <Text className="text-center">blood donar</Text>
                <Text className="text-center">{sandhani.amount}</Text>
                </View>
                
                
             </View>
             
             <TouchableOpacity onPress={()=>onClick(sandhani)}>
             <Text className="mt-2 mb-2 text-red-700 text-center text-xl ">View more</Text>
            </TouchableOpacity>
            
            </Animated.View>
            
           </TouchableOpacity>
           
    )
}