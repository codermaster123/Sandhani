import DropDownPicker from 'react-native-dropdown-picker';
import {useState,useCallback} from "react"
import {TouchableHighlight,Text,View} from "react-native";
import Linking from "../Components/Linking";

export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ])
  const onTap=useCallback(async()=>{
      await Linking.openURL("https://reactnative.dev/docs/linking?language=javascript");
      
  }
  )
  return (
    <View className="px-2">
    <Linking url="https://www.facebook.com/sandhani.smmamcu" iconName="facebook" buttonText="Follow on Facebook"/>
    <Linking url="https://reactnative.dev/docs/linking?language=javascript" iconName="google" buttonText="Google"/>
    </View>
  );
}