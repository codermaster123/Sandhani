import React ,{useRef,useEffect}  from "react";
import {View,Text,Animated} from "react-native"

export default function CardSkeleton() {
      const opacityAnimation = useRef(new Animated.Value(0.5)).current;
  useEffect(()=>{
    
    Animated.loop(
    Animated.sequence([
      Animated.timing(opacityAnimation,{
        toValue:1,
        duration:500,
        useNativeDriver:true
      }),
      Animated.timing(opacityAnimation,{
        toValue:0.3,
        duration:800,
        useNativeDriver:true
      })
    ])).start()
    
    
    },[opacityAnimation])
    
  
    return (
        <Animated.View  style={{ opacity: opacityAnimation }} className="bg-white rounded-lg  m-2 ">
        <View className=" flex-row items-center space-x-2 m-2">
       <Animated.View  style={{ opacity: opacityAnimation }} className="w-20 h-20 bg-gray-100 rounded-full"></Animated.View>
        <View className="flex-col space-y-2">
        <View className="h-2.5 bg-gray-100 w-32 rounded"></View>
        <View className="h-2.5 bg-gray-100 w-32 rounded"></View>
        </View>
        </View>
        <View className="flex-row w-full boder-gray-100 p-2 space-x-2 justify-center">
         <View className="h-2.5 bg-gray-100 w-1/2 rounded"></View>
         <View className="h-2.5 bg-gray-100 w-1/2 rounded"></View>
        
        </View>
         <View className="flex-row w-full p-2 boder-gray-100  space-x-2 justify-center">
         <View className="h-2.5 bg-gray-100 w-1/2 rounded"></View>
         <View className="h-2.5 bg-gray-100 w-1/2 rounded"></View>
        
        </View>
        <View className="m-2 ">
        <View className="h-8 bg-gray-100  rounded">
        </View>
        </View>
        
        
        </Animated.View>
        
        )
        
}