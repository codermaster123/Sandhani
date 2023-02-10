import React, { useState } from 'react'
import { Text,TouchableOpacity,View,Image } from 'react-native'

export default function list({label,value}) {

  return (
         <View className="flex-row h-10 border-2 m-2 rounded-lg border-gray-300 items-center justify-between">
        <Text className="ml-2">{label}</Text>
       <Text className="mr-2 font-bold">{value}</Text>
      </View>

  )
}
