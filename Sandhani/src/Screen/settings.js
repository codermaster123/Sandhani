import DropDownPicker from 'react-native-dropdown-picker';
import {useState,useCallback} from "react"
import {ScrollView,TouchableHighlight,Text,View,Image} from "react-native";
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
    <ScrollView className="flex-1">
  <View className="bg-white justify-center items-center p-2"  >
    <Image  className="justify-center items-center w-20 m-2 h-20  rounded-full " source={require("../assets/about.jpg")}/>
   <Text className="text-justify text-neutral-700 line-clamp-3 p-2 pl-4 w-full tracking-wide leading-6">Sandhani is a renowned voluntary blood donation organization in Bangladesh.Founded in 1982,it is one of the largest and most active blood donation organizations in the country.The name "Sandhani" translates to "lifeline" in Bengali,signifying the organization's crucial role in saving lives through blood donations.
   
   Sandhani operates with the mission of ensuring a safe and adequate blood supply for patients in need, promoting awareness about the importance of voluntary blood donation, and building a compassionate society. It aims to create a voluntary blood donation movement that encourages individuals to donate blood regularly and willingly.
   </Text>
  </View>
      
    <Linking url="https://www.facebook.com/sandhani.smmamcu" iconName="facebook" buttonText="Follow on Facebook"/>
    <Linking url="https://reactnative.dev/docs/linking?language=javascript" iconName="google" buttonText="Google"/>
    </ScrollView>
  );
}