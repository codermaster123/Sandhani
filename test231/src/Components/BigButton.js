import React from "react"

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native"


export default function BigButton({name,onClick}) {
  return (
    
    <TouchableOpacity className="mt-4 w-full mr-4 h-12 bg-red-700 justify-center rounded" activeOpacity={0.9} disable={true} onPress={onClick}>
          <Text className="text-center text-white font-bold text-lg rounded-md">{name}</Text>
    </TouchableOpacity>
    
    )
}
