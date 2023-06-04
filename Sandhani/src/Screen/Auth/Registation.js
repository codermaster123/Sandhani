import {
  StatusBar
} from 'expo-status-bar';
import React from 'react';
import {
  useState,useEffect,useContext
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  InteractionManager,
  ActivityIndicator
  
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"
import * as ImagePicker from 'expo-image-picker';
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import fetcher from "../../utilis/fetcher"
import LoadingIndicator from "../../Components/LoadingIndicator"

import Input from "../../Components/Input";
import Link from "../../Components/Link";

import BigButton from "../../Components/BigButton";

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../URL';
import {Dropdown} from 'react-native-element-dropdown';

import {AuthContext} from "../../../Context";

export default function SignUp( {
  navigation,route
}) {
  const {login,districts,setUpazilaDetails}=useContext(AuthContext);
   const [upazilaData,setUpazilaData]=useState([])
  const [isFocus, setIsFocus] = useState(false);
  const [district, setDistrict] = useState(null);
  const [upazila, setUpazila] = useState(null);
  const [loading,setLoading]=useState(true);
  // const [isLoading,setisLoading]=useState(true);
  const [bloodGroup,setBloodGroup]=useState(null)
  const [image,
    setImage] = useState(null);

  const [input,
    setInput] = useState({
      name: "", phone: "", bloodGroup: "",age:"", address: "", Password: ""
    })
  const [error,
    setError] = useState(false)
  const onTap = ()=> {

    navigation.navigate("Login");
    
  }



  const handleInput = (input, text)=> {
    setInput((prev)=>({
      ...prev, [input]: text
    }));


  }
  const handleAddTask=async()=>{
  
  let data=new FormData()
   
    data.append("name",input.name)
    data.append('User', {
      uri:image, name: 'image.jpg', type: 'image/jpg'
    });
    
    data.append("phone",input.phone)
    data.append("bloodGroup",bloodGroup)
    data.append("address",input.address)
    data.append("age",input.age)
    data.append("district",district)
    data.append("upazila", upazila);
    data.append("password",input.Password)
  setLoading((prev)=>!prev)
  let res = await fetch(`${URL}/addDonar`,{
    method:'POST',
      
      
    body:data,
    
    
  })
      
  let response= await res.json();
  // setisLoading((prev)=>!prev);
   
    setLoading((prev)=>!prev)
    login(response.token)
  
  //navigation.navigate("Profile",{token:response.token});
    
     
  }
  
  const handleError = ()=> {
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
    useEffect(()=>{
        InteractionManager.runAfterInteractions(()=>{
              setLoading((prev)=>!prev);
              
          
          
        })
    },[])
    if(loading){
          return <LoadingIndicator/>
    }

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
               <Image source={ { uri: image }} className="w-20 m-2 h-20 rounded-full " />
                 <Ionicons name="camera" onPress={handleImagePicker} color="white" style={ { position: "absolute", bottom: 0, right: 0, fontSize: 20, textAlign: "center", backgroundColor: "gray", width: 20, height: 20, zIndex: 999, opacity: 0.7, borderRadius: 100, overflow: 'hidden' }} />
           </View>

      }
          </View>
            <Input placeholder="Enter your Name" label="Name" IconName="account-box-outline" onChangeText={(text)=>handleInput("name", text)} error={error?"please enter your correct Details ": null} />
            <Input placeholder="+880" label="Phone" IconName="phone" onChangeText={(text)=>handleInput("phone", text)} error={error?"please enter your correct Details ": null} />
                 <Text className="text-lg my-2 text-gray-300">Present Address(Donation Area)</Text>
             
                  <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'red'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={[{label:"A+",value:"A+"},{label:"B+",value:"B+"},{label:"O+",value:"O+"},{label:"AB+",value:"AB+"},{label:"A-",value:"A-"},{label:"B-",value:"B-"},{label:"O-",value:"O-"},{label:"AB-",value:"AB-"}]}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Blood group' : '...'}
          searchPlaceholder="Search..."
          value={bloodGroup}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={item => {
            
            setBloodGroup((prev)=>item.value);
            
            
          }}
        />
        <Input placeholder="Enter your  age" label="Age" IconName="calendar-account-outline" onChangeText={(text)=>handleInput("age", text)} error={error?"please enter your correct Details ": null} />
             
             <Input placeholder="Enter your  address" label="parmanent Adress" IconName="home-outline" onChangeText={(text)=>handleInput("address", text)} error={error?"please enter your correct Details ": null} />
             
             <Text className="text-lg my-2 text-gray-300">Present Address(Donation Area)</Text>
             
             <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'red'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={districts}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select District' : '...'}
          searchPlaceholder="Search..."
          value={district}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setDistrict((prev)=>item.value)
            const data=setUpazilaDetails(item.value);
            
            setUpazilaData((prev)=>data);
            
            setIsFocus(false);
          }}
        />
        
                 <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'red'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={upazilaData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Upazila' : '...'}
          searchPlaceholder="Search..."
          value={upazila}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
             setUpazila(item.value)
            setIsFocus(false);
          }}
        />
            <Input placeholder="Enter your Password" label="password" IconName="lock-outline" password onChangeText={(text)=>handleInput("Password", text)} error={error?"please enter your correct Details ": null} />
            </View>
            <View className="w-full  flex-row ml-2">
             <Text className="text-sm text-gray-600">if you have no account.</Text>
              <Link text="click here" onTap={onTap} />
           </View>
                <TouchableOpacity activeOpacity={0.7} className=" bg-red-700 h-10 p-2  m-2  rounded-lg justify-center items-center  " onPress={handleAddTask}><Text className="text-white">sing up</Text></TouchableOpacity>
         </ScrollView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
