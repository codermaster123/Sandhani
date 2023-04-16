import React, { useState,useContext } from "react";
import {ToastAndroid,View,TouchableHighlight,Text,Image,Modal,TouchableOpacity,StyleSheet} from "react-native";
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
import {AuthContext} from "../../Context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingIndicator from "../Components/LoadingIndicator"
import URL from "../URL";

const StyledPressable = styled(TouchableOpacity)
const StyledText = styled(Text)
export default  function Profile({route}) {
  console.log("render profile")
  const {logout}=useContext(AuthContext);
  
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
      
    const  {data,isLoading,isError}=useQuery(["getUserDetails"],()=>fetcher(URL+"/findUser/",{ method:"GET",
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
          logout()
          //#86EFAC
     
      }
      
    })
    const handleModal=()=>{
      
      setVisible((prev)=>!prev)
    }
     if(isLoading){
         return <LoadingIndicator/>
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
     <TouchableHighlight    style={styles.buttonContainer}
    onPress={()=>ToastAndroid.show("fill it",ToastAndroid.LONG)} activeOpacity={0.7} underlayColor="#86EFAC" className="absolute right-0 top-0 m-2   bg-green-500  rounded-lg">
        <View className="flex-1 flex-row justify-center items-center">
        <Icon style={{fontSize:20 ,color:"#fff",marginRight:10}} name="logout"/>
      
          <Text style={styles.buttonText} className=" ">
            Logout
          </Text>
        </View>
        
      </TouchableHighlight>
      
     </View>
      </View>
    )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    elevation: 2, // adds shadow effect on Android
    shadowColor: '#000000', // adds shadow effect on iOS
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
  },
});
