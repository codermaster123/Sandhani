import React from "react";
import {View,Text,Image,StyleSheet} from "react-native";

import BigButton from "../Components/BigButton";


const Welcome=({ navigation, route })=>{
    const onButtonTap=()=>{
      
      navigation.navigate("Tab");
      
      
    }
    return(
      <View className="bg-white  flex-1 relative">
      <View className="items-center justify-center top-20">
     <Image resizeMode="cover" className=" justify-center items-center border-red-300 w-[300px] h-[300px] top-[60px]" source={require("../assets/im1.png")}/>
      </View>
      <Text className="tracking-tight absolute bottom-[90px] m-4  text-sm text-gray-400 leading-4">Lorem test it are ipsum dolor sit amet,consectetur adipiscing elit.Sed non risus.Suspendisse lectus tortor,dignissim sit amet,adipiscing nec,ultricies sed,dolor.Cras elementum ultrices diam.Maecenas ligula massa,varius a,semper congue,euismod non, mi. Proin porttitor</Text>
      <View style={page.button} className="bottom-[20px] w-full p-2  ">
      <BigButton name="Welcome" onClick={onButtonTap}/>
       </View>
      </View>
      )
};

const page = StyleSheet.create({
  button:{
    position:"absolute"
  }
  
})

export default Welcome;
