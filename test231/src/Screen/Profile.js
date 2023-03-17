import React, { useState } from "react";
import {View,Text,Image,Modal,TouchableOpacity} from "react-native";
import {
  useQuery,
  useMutation,
  useQueryClient,
  
} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetcher from "../utilis/fetcher"
import useToken  from "../utilis/useToken";
import List from "../Components/list";
import Input from "../Components/Input";
import BigButton from "../Components/BigButton";
import { styled } from 'nativewind';

const StyledPressable = styled(TouchableOpacity)
const StyledText = styled(Text)
export default  function Profile({route}) {
  console.log("render profile")
  const [user,setuser] =useState(null);
  const [sandhani,setSandhani]=useState(null)
  const [isActive,setActive]=useState(true)
  
  const [isVisible,setVisible]=useState(false)
  const handleDate=(date)=>{
    const currentDate=new Date();
    let diff=currentDate-date;
    let diffIndays=diff/(1000*60*60*24);
    if(dMath.floor(iffIndays)>=120){
      setActive(true);

    }
  }

  const {token} = route.params
  console.log(token);
  
      // const token=useToken()
      
    const  {data,isLoading}=useQuery(["getUserDetails"],()=>fetcher(URL+"/findUser/",{ method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
    }),{
      
      refetchOnWindowFocus: false,
      enabled:true,
      onSuccess(data){
      
          setuser((prev)=>data);
          setActive(!data?.isDonted)
          if(data?.isDonted){
             handleDate(data?.donateDate)
          }
          setSandhani((prev)=>data.sandhani)
          
      },
      onError(e){
          console.log(e)
      }
      
    })
    const handleModal=()=>{
      console.log("click")
      setVisible((prev)=>!prev)
    }

  return(
      <View className="flex-1 flex-col ">

    <View className="flex-col justify-center items-center  rounded shadow-lg shadow-red-700 bg-white py-2">
  <View className="shadow-lg shadow-red-300">   
   <Image  className="w-20 m-2 h-20  rounded-full " source={{uri:user?.img}}/>
  </View>

    <Text className="text-xl font-bold">{user?.name}</Text>   
      <TouchableOpacity onPress={handleModal} className="bg-green-500 h-8 w-20 items-center justify-center rounded-lg">
        <Text className="text-white font-bold">{isActive? "Active":"Inactive"}</Text>  
      </TouchableOpacity> 
      
      <Modal transparent={true}  animationType="fade"  visible={isVisible} style={{margin:20}}>
        <View style={{ flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }} >
    <View className="bg-white p-10 shadow-lg shadow-red-700 rounded-lg">
      <Input placeholder="2023/12/1" label="Date of last Donetion" IconName="phone"  />
            
        <StyledPressable onPress={handleModal} className="hover:bg-green-500   bg-red-500 h-8 w-20 items-center justify-center rounded-lg">
        <Text className="text-white font-bold">submit</Text>  
      </StyledPressable> 
      
      </View>
     </View>
   </Modal>
      
    </View>
           
     <View className="flex-col bg-white ">
     <List label="Age" value={user?.age}/>
  
       <List label="Blood Group" value={user?.bloodGroup}/>
       <List label="Phone" value={user?.phone}/>
       <List label="Address" value={user?.address}/>
       <List label="Donor of" value={sandhani?.name}/>
     </View>
     <View className="flex-1 bg-white">
     </View>
      </View>
    )
}