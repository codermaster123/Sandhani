import React from "react"
import {TextInput ,View,Text,StyleSheet} from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import COLORS from "../assets/Color";

export default function Input({label,IconName,error,password,onFocus=()=>{},COLOR,...props}) {
  
  const [isFocus,setFocus]=React.useState(false);
  const [hidePassword,setHidePassword]=React.useState(password)
  
  return (
    
    <View className="mb-2">
       <Text className="text-lg my-2 text-gray-300">{label}</Text>
      <View
      className="h-10 flex-row bg-gray-100 border-2 items-center px-2   "
      style={{borderColor: error
              ? COLORS.red
              : isFocus
              ? COLORS.red
              : COLORS.light}}>
      <Icon style={{fontSize:20 ,color:COLORS.red,marginRight:10}} name={IconName}/>
      <TextInput selectionColor={"red"} secureTextEntry={hidePassword} autoCorrect={false} onFocus={()=>{
        onFocus();
        setFocus(true)
      }} onBlur={()=>{ setFocus(false);}}style={{color:COLORS.black,flex:1}} {...props} />
      {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: COLORS.red, fontSize: 22}}
          />
        )}
      </View>
     
     {error && (<Text className="text-red-600 text-sm mt-2">{error}</Text>)}
    </View>
    )
  
  
}