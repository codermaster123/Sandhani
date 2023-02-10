import {
  StatusBar
} from 'expo-status-bar';
import React from 'react';
import {
  useState
} from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"
import * as ImagePicker from 'expo-image-picker';
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import fetcher from "../../utilis/fetcher"

import Input from "../../Components/Input";
import Link from "../../Components/Link";
import BigButton from "../../Components/BigButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SignUp( {
  navigation
}) {
  const [image,
    setImage] = useState(null);

  const [input,
    setInput] = useState({
      name: "", phone: "", bloodGroup: "", address: "", Password: ""
    })
  const [error,
    setError] = useState(false)
  const onTap = ()=> {

    navigation.navigate("Login");
    
  }



  const mutation = useMutation((param)=>fetcher("http://192.168.0.100:3000/addDonar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: param,
  }), {
    onSuccess(data) {
      console.log(data)
    }
    


  })
  

  const handleInput = (input, text)=> {
    setInput((prev)=>({
      ...prev, [input]: text
    }));


  }
  const handleAddTask=async()=>{
    console.log("vkfmfn")
  let data=new FormData()
   console.log(image)
    
    data.append("name",input.name)
    data.append('User', {
      uri:image, name: 'image.jpg', type: 'image/jpg'
    });
    
    data.append("phone",input.phone)
    data.append("bloodGroup",input.bloodGroup)
    data.append("address",input.address)
    data.append("password",input.Password)
  
  let res = await fetch("http://localhost:3000/addDonar",{
    method:'POST',
      
      
    body:data,
    
    
  })
      
  let response= await res.json();
  console.log(response);
  
  const t=await AsyncStorage.setItem("userToken",response.token);
  navigation.navigate("select");
    
  
  }
  
  const handleError = ()=> {
    console.log("invoke")
    Object.keys(input).map((key)=> {
      if (input[key] == "" || input[key].length <= 0) {
        setError(true);



        return error
      }
      setError(false);

    })
  }


  const handleImagePicker = async()=> {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,

      aspect: [4,
        4],
    });

    if (!result.canceled) {

      setImage(result.assets[0].uri);
    }}

  return (

    <ScrollView className="px-2 bg-white flex-1">
            <View className="p-2">
            <View className="items-center justify-center">
            {!image &&
      <View className="">
              <Ionicons name="person-circle" color="black" style={ { fontSize: 84, textAlign: "center", zIndex: 1 }} />
              <Ionicons name="camera" onPress={handleImagePicker} color="white" style={ { position: "absolute", fontSize: 20, right: 10, bottom: 6, textAlign: "center", backgroundColor: "gray", width: 20, height: 20, zIndex: 999, opacity: 0.5, borderRadius: 100, overflow: 'hidden' }} />
              </View>
      }
            {image &&
      <View classNam="">
               <Image source={ { uri: image }} className="w-20 m-2 h-20 border-2 border-red-300 rounded-full " />
                 <Ionicons name="camera" onPress={handleImagePicker} color="white" style={ { position: "absolute", bottom: 0, right: 0, fontSize: 20, textAlign: "center", backgroundColor: "gray", width: 20, height: 20, zIndex: 999, opacity: 0.7, borderRadius: 100, overflow: 'hidden' }} />
           </View>

      }
          </View>
            <Input placeholder="Enter your Name" label="Name" IconName="account-box-outline" onChangeText={(text)=>handleInput("name", text)} error={error?"please enter your correct Details ": null} />
            <Input placeholder="+880" label="Phone" IconName="phone" onChangeText={(text)=>handleInput("phone", text)} error={error?"please enter your correct Details ": null} />
             <Input placeholder="Enter your blood group" label="Blood group" IconName="blood-bag" onChangeText={(text)=>handleInput("bloodGroup", text)} error={error?"please enter your correct Details ": null} />
            <Input placeholder="Enter your Address" label="Address" IconName="home-outline" onChangeText={(text)=>handleInput("address", text)} error={error?"please enter your correct Details ": null} />
            <Input placeholder="Enter your Password" label="password" IconName="lock-outline" password onChangeText={(text)=>handleInput("password", text)} error={error?"please enter your correct Details ": null} />
            </View>
            <View className="w-full  flex-row ml-2">
             <Text className="text-sm text-gray-600">if you have no account.</Text>
              <Link text="click here" onTap={onTap} />
           </View>
                <TouchableOpacity activeOpacity={0.7} className=" bg-red-700 h-10 p-2  m-2  rounded-lg justify-center items-center  " onPress={handleAddTask}><Text className="text-white">sing up</Text></TouchableOpacity>
         </ScrollView>
  )

}