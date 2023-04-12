import {TouchableOpacity,Text,View,Modal,Pressable} from "react-native"
import {useState,useEffect,useCallback} from "react"
import Icon from 'react-native-vector-icons/AntDesign';

const DonarModal=({groupName,sId,isVisible,onChange})=>{
  const [show,setShow]=useState(false);
  useEffect(()=>{
      onChange(setShow)
  },[])
  return (
        <Modal hardwareAccelerated={true} onRequestClose={onChange}   transparent={true} animationType="fade"  visible={show} >
       <View className="flex-1 justify-center items-center h-full w-full">
       <View  className="bg-white h-3/4 w-4/5 mx-8 rounded-md shadow-md shadow-red-500">
      
      <Text className="text-lg text-center mt-6 ">{groupName}</Text>
     </View>
     </View>
      </Modal>

    )
  
  
}
export default DonarModal;
