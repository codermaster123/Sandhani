import React,{useState} from "react";
import {Text,View,ScrollView} from "react-native";
import Input from "../../Components/Input";
import Link from "../../Components/Link";
import BigButton from "../../Components/BigButton";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import fetcher from "../../utilis/fetcher"
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../URL';

const Login=({navigation})=>{
   console.log("render profile")
  
  const [input,
    setInput] = useState({
      name: "", phone: "", Password: ""})
  const [error,
    setError] = useState(false)
    
  const onTap = ()=> {
    navigation.navigate("Registaton")
    
  }
  const onButtonTap =async()=> {
    await mutation.mutate(input)
    
    
  }
  const handleInput = (input, text)=> {
    setInput((prev)=>({
      ...prev, [input]: text
    }));


  }
  const mutation = useMutation((param)=>fetcher(`${URL}/userLogin`, {
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
  
  
  
  
	
	return (
	         <View className="pt-12 bg-white flex-1">
     <ScrollView className="px-4 pt-2">
       <Text className="font-bold text-xl text-black">Login to your account</Text>
      <Text className="py-2 text-gray-700 text-sm">
            Enter your Details to Login
      </Text>
      <Input placeholder="Enter your Name" label="Name" IconName="account-box-outline" onChangeText={(text)=>handleInput("name", text)}/>
      <Input placeholder="+088" label="Phone" IconName="phone" onChangeText={(text)=>handleInput("phone", text)}/>
      <Input placeholder="Enter your Password" label="password" IconName="lock-outline" onChangeText={(text)=>handleInput("password", text)} password />
      <View className="w-full  flex-row">
        <Text className="text-sm text-gray-600">if you have no account.</Text>
       <Link text="click here" onTap={onTap} />
      </View>
      
     <BigButton name="Login" onClick={onButtonTap} />
     
  </ScrollView>
</View>

		)
	
}
export default React.memo(Login);
