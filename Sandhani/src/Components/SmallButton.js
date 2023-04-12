import React from "react"

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native"

export default function BigButton({name,onClick}) {
  return (
    
     <TouchableOpacity onPress={onClick}>
        <Text className="mt-2 mb-2 text-red-700 text-center text-xl ">{name}</Text>
     </TouchableOpacity>
            
    
    )
}
