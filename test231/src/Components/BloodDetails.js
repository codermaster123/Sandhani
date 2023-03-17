import React, {useState,useEffect} from "react"
import {View,Text,ScrollView} from "react-native"
import fetcher from "../utilis/fetcher"

import URL from "../URL";
import {
  useQuery,
  useMutation,
  useQueryClient,
  
} from '@tanstack/react-query';

const BloodDetails=({sId})=> {
  console.log("blood details")
  const [bloods,setBloods]=useState(null)
    
  const {isLoading}=useQuery(["bloods"],()=>fetcher(`${URL}/getblood/${sId}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        
      },
    }),{
      onSuccess:(data)=>{
        setBloods((prev)=>{
      return data.bloodData;
    })
      }
    })
  
    
  
  
  
   return (
    <View className="flex-1">
        <ScrollView
         scrollEventThrottle={16}
      
        className="m-2  rounded-md bg-white"
        >
       
        <View  className="flex-row w-ful border border-red-500 p-2 m-2 ">
               <View className="w-1/2"><Text className="text-center">Group</Text></View>
               <View className="w-1/2"><Text className="text-center">Amount</Text></View>
               
            </View>
        
            
         {bloods && bloods.map((blood)=>{
           
           return (
            <View key={blood._id} className="flex-row w-ful border border-red-500 p-2 m-2  
            ">
               <View className="w-1/2"><Text className="text-center">{blood.groupName}</Text></View>
               <View className="w-1/2"><Text className="text-center">{blood.amount}</Text></View>
               
            </View>
            
           
           )
           
           
         })}
        
        
     </ScrollView>
     </View>
)
}

export default React.memo(BloodDetails);