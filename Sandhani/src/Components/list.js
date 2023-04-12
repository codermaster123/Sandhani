import React, { useState } from 'react'
import { Text,TouchableOpacity,View,Image,Pressable } from 'react-native'
import { styled, useColorScheme } from "nativewind";


const StyledPressable = styled(Pressable)
const StyledView = styled(View);
const StyledText = styled(Text)
export default function list({label,value}) {
      const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
         <StyledView className="dark:bg-red-700 flex-row h-10 bg-white p-2  rounded shadow-lg  border-b border-red-500 items-center justify-between">
        <Text className="ml-2">{label}</Text>
       <Text className="mr-2 font-semibold">{value}</Text>
      </StyledView>

  )
}
