import React,{useState,useEffect,useRef} from "react";
import {View,Text,ScrollView,TouchableOpacity,Image,Animated} from "react-native";
import Card from "../Components/Card"
import CardSkeleton from "../Components/Cardskeleton"

import URL from "../URL";
import fetcher from "../utilis/fetcher"
import {
  useQuery,
  useMutation,
  useQueryClient,
  
} from '@tanstack/react-query';

const Home=({navigation})=>{
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const [allSandhani,setAllSandhani]=useState(null);
    
    const onClick=(thisSandhani)=>{
      
      navigation.navigate("Details",{
        sandhani:thisSandhani
      });
      
      
    }
    const  {data,isLoading}=useQuery(["getAll"],()=>fetcher(URL+"/getAllSandhani"),{
      
      refetchOnWindowFocus: false,
      enabled:true,
      onSuccess(data){
        
        setAllSandhani((prev)=>{
          return data;
          
        })
        
      }
      
    })
    
    const loadAllSandhani=async()=>{
      const res=await fetch(URL+"/getAllSandhani",{
        method:'GET',
        headers:{
        "Content-Type":"application/json"
      },
      });
      const data=await res.json();
      setAllSandhani(data)
      
    }
    
    
    if(isLoading){
      return (
        <ScrollView className="flex-1">
        {items.map((item)=>{
          return  <CardSkeleton key={item}/>
        })}
        </ScrollView>
        )
    }
    
    return(
      <View className="flex-1">
      <ScrollView contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
        
      >
      
      
       {allSandhani && allSandhani.map((sandhani)=>{
           
           return (
           <Card key={sandhani._id} sandhani={sandhani} onClick={onClick}/>
           
           )
         
       })
       }
      
      
      </ScrollView>
      </View>
      )
};

export default Home;
