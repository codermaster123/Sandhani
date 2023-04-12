import React,{useState,useContext} from "react";
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
import {AuthContext} from "../../../Context";

const Login=({navigation})=>{
   console.log("render login")
  const {login}=useContext(AuthContext);
  
  const [input,
    setInput] = useState({
      name: "", phone: "", password: ""})
  const [error,
    setError] = useState(false)
    
  const onTap = ()=> {
    navigation.navigate("Registaton")
    
  }
  const onButtonTap =async()=> {
    console.log(input)
    await mutation.mutate(input)
    
    
  }
  const handleInput = (input, text)=> {
    console.log(input)
    setInput((prev)=>({
      ...prev, [input]: text
    }));


  }
  const mutation = useMutation((param)=>fetcher(`${URL}/userLogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    
    body:JSON.stringify(param)
        
  }), {
    onSuccess(data) {
      // login(response.token)
       console.log(data)
    },
    onError(e){
      console.log(e.error)
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
      <Input placeholder="Enter your Password" label="password" IconName="lock-outline" password onChangeText={(text)=>handleInput("password", text)}  />
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
