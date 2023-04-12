import React from "react"

import {
  View,
  Text,
  TouchableHighlight
} from "react-native"

export default function Link({text,onTap}){
  return(
        <TouchableHighlight onPress={onTap} className="" underlayColor="#fff" activeOpacity={0.7} >
          <Text className="text-sm font-bold text-red-500">{text}</Text>
        </TouchableHighlight>
    )
}
