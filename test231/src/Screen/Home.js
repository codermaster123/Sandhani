import React,{useState,useEffect} from "react";
import {View,Text,ScrollView,TouchableOpacity,Image} from "react-native";
import Card from "../Components/Card"
import URL from "../URL";
import fetcher from "../utilis/fetcher"
import {
  useQuery,
  useMutation,
  useQueryClient,
  
} from '@tanstack/react-query';

const Home=({navigation})=>{
    const [allSandhani,setAllSandhani]=useState(null);
    
    const onClick=(thisSandhani)=>{
      
      navigation.navigate("Details",{
        sandhani:thisSandhani
      });
      
      
    }
    const  {data}=useQuery(["getAll"],()=>fetcher(URL+"/getAllSandhani"),{
      
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
    useEffect(()=>{
      // loadAllSandhani()
    },[])
    
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
