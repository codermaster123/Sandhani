import {useState,useEffect} from "react"
import {View,Text,ScrollView} from "react-native"


export default function BloodDetails({sId}) {
  
  const [bloods,setBloods]=useState(null)
  
  const getAllBloodDetail=async()=>{
    
    const res=await fetch(`http://localhost:3000/getblood/${sId}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        
      },
    })
    const data=await res.json();
    // console.log(data.bloodData);
    setBloods((prev)=>{
      return data.bloodData;
    })
    console.log(bloods)
  }
  useEffect(()=>{
    getAllBloodDetail()
    
  },[])
  
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