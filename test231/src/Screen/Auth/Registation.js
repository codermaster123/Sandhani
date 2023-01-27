import {
  StatusBar
} from 'expo-status-bar';
import React from 'react';
import {useState} from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView
} from 'react-native';

import Input from "../../Components/Input";
import Link from "../../Components/Link";
import BigButton from "../../Components/BigButton";


export default function SignUp({navigation}) {
    
    const [input,setInput]=useState({name:"",phone:"",bloodGroup:"",address:"",Password:""})
    
    const onTap=()=>{
        
      navigation.navigate("Login");
    }
    const onButtonTap=()=>{
    	handleError()
         console.log(input)
    }
    const handleInput=(input,text)=>{
         setInput((prev)=>({...prev,[input]:text}));
    }
    const handleError=()=>{
    	
    	  if(input.name=""){
    	  	
    	  }
    	  
    }
    
  return (
     <View className=" bg-white flex-1">
         <ScrollView className="px-4 ">
            <Text className="text-black text-4xl font-bold">Register</Text>
            <Text className="py-2 text-gray-700 text-sm">
            Enter your Details to Register
            </Text>
            
            <View className="">
            <Input  placeholder="Enter your Name" label="Name" IconName="account-box-outline" onChangeText={(text)=>handleInput("name",text)}/>
            <Input  placeholder="+880" label="Phone" IconName="phone" onChangeText={(text)=>handleInput("phone",text)}/>
             <Input  placeholder="Enter your blood group" label="Blood group" IconName="blood-bag" onChangeText={(text)=>handleInput("bloodGroup",text)}/>
            <Input  placeholder="Enter your Address" label="Address" IconName="home-outline" onChangeText={(text)=>handleInput("address",text)}/>
            <Input  placeholder="Enter your Password" label="password" IconName="lock-outline" password onChangeText={(text)=>handleInput("password",text)}/>
            </View>
            <View className="w-full  flex-row ">
             <Text className="text-sm text-gray-600">if you have no account.</Text>
              <Link text="click here"  onTap={onTap} />
           
           </View>
           <BigButton name="Sign up" onClick={onButtonTap} />
         
         </ScrollView>
     </View>
  )

}