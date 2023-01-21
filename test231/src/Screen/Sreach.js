import React,{useState} from "react";
import {View,Text,TextInput,TouchableOpacity} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

import SmallButton from "../Components/SmallButton"
import Card from "../Components/Card"

import {
  useQuery,
  useMutation,
  useQueryClient,
  
} from '@tanstack/react-query';

import fetcher from "../utilis/fetcher"

export default function Sreach () {
    const [input,setInput]=useState("");
    const [isEnable,setEnable]=useState(false)
    const [sandhanis,setSandhanis]=useState()
    
    const handlePress=()=>{
          
        
      
    }
    
    
    const  {data,refetch}=useQuery(["search",input],()=>fetcher(`http://localhost:3000/search?q=${input}`),{
      
      refetchOnWindowFocus: false,
      enabled:true,
      onSuccess(data){
        setSandhanis((prev)=>{
          return data;
          
        })
        
      }
      
    })
    const handleText=(text)=>{
          
        setInput((prev)=>{
          return text;
          
        })
        // if(input.length>1 || input.length==1){
        // if(input.length>1){
        //   setEnable(true)
        
        // }else{
        //     setEnable(false)
        //     setSandhanis(null)
        // }
        // }
        
        
      
    }
  
  

    
    
    return (
      <>
      <View className="flex-1  ">
        <View className=" h-10  m-2 ml-4  rounded-md  flex-row bg-gray-50 border-b border-red-500 items-center  shadow-lg" style={{marginRight:20,shadowColor:"red",shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.8, shadowRadius: 3}}>
        
          <Ionicons name="search" style={{fontSize:20,color:"red"}}  />
         <TextInput placeholder="Enter the sandhani name"  className="ml-2 " value={input} onChangeText={(text)=>handleText(text)}/>
         
     
        </View>
        {sandhanis && sandhanis.map((sandhani)=>{
          return(
          
          
          <Card key={sandhani._id} sandhani={sandhani} />
           
          )
          
        })}
      </View>
      </>
      
    )
}