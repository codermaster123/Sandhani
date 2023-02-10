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

export default  function Profile({route}) {
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
  const {token}=route.params;
      // const token=useToken()
      
    const  {data,isLoading}=useQuery(["getUserDetails"],()=>fetcher(URL+"/findUser/"+token),{
      
      refetchOnWindowFocus: false,
      enabled:true,
      onSuccess(data){
        console.log(data);
       
          setuser((prev)=>data);
          setActive(!data?.isDonted)
          if(data?.isDonted){
             handleDate(data?.donateDate)
          }
          setSandhani((prev)=>data.sandhani)
          
      }
      
    })
    const handleModal=()=>{
      console.log("click")
      setVisible((prev)=>!prev)
    }
  
  return(
      <View className="flex-1 flex-col bg-white">

    <View className="flex-col justify-center items-center mt-10">
  <View className="shadow-lg shadow-red-300">   
   <Image  className="w-20 m-2 h-20 border-2 border-red-300 rounded-full " source={{uri:user?.img}}/>
  </View>

    <Text className="text-xl font-bold">{user?.name}</Text>   
      <TouchableOpacity onPress={handleModal} className="bg-green-500 h-8 w-20 items-center justify-center rounded-lg">
        <Text className="text-white font-bold">{isActive? "Active":"Inactive"}</Text>  
      </TouchableOpacity> 
      <Modal animationType="slide" transparent={true} visible={isVisible} style={{margin:20}}>
      <Input placeholder="2023/12/1" label="Date of last Donetion" IconName="phone"  />
            <BigButton name="submit" onClick={handleModal}/>
        
      </Modal>
    </View>
           
     <View className="flex-col mt-2">
     <List label="Age" value={user?.age}/>
  
       <List label="Blood Group" value={user?.bloodGroup}/>
       <List label="Phone" value={user?.phone}/>
       <List label="Address" value={user?.address}/>
       <List label="Donor of" value={sandhani?.name}/>
     </View>
      </View>
    )
}