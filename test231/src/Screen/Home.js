import React,{useState,useEffect} from "react";
import {View,Text,ScrollView,TouchableOpacity,Image} from "react-native";
import Card from "../Components/Card"

const Home=({navigation})=>{
    const [allSandhani,setAllSandhani]=useState(null);
    
    const onClick=(thisSandhani)=>{
      
      navigation.navigate("Details",{
        sandhani:thisSandhani
      });
      
    }
    
    const loadAllSandhani=async()=>{
      const res=await fetch("http://localhost:3000/getAllSandhani",{
        method:'GET',
        headers:{
        "Content-Type":"application/json"
      },
      });
      const data=await res.json();
      setAllSandhani(data)
      
    }
    useEffect(()=>{
      loadAllSandhani()
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
