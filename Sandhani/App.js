import { StatusBar } from 'expo-status-bar';

import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {SocketProvider} from "./Context";
import {NavigationContainer} from '@react-navigation/native';
// import { createNativeStackNavigator,CardStyleInterpolators,TransitionPresets } from '@react-navigation/native-stack';
import { createStackNavigator,CardStyleInterpolators,TransitionPresets } from '@react-navigation/stack';

// import {useFonts} from 'expo-font';
// import AppLoading from "expo-app-loading"

import Welcome from "./src/Screen/Welcome";
import Tab from "./src/Navigation/Tab";

import client from "./react-query-client"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';


const Stack=createStackNavigator();

export default function App() {
  const [wScreen,setScreen]=useState(true);
  
  // const [fontLoad]=useFonts({
  //   Kalpurush:require("./fonts/Kalpurush.ttf")
  // })
  // if(!fontLoad){
  //   return <AppLoading/>
  // }

  return (
    <QueryClientProvider client={client}>
    <StatusBar style="dark" />
     
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Welcome">{(props)=> <Welcome  {...props}/>}</Stack.Screen>
      <Stack.Screen name="Tab" component={Tab} />
      </Stack.Navigator>
      
  </NavigationContainer>

  </QueryClientProvider>
   
  );
}


// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// //- import { StyleSheet, Text, View } from 'react-native';
// import { Text, View } from 'react-native';

// export default function App() {
//   return (
//   <View className="flex-1 items-center justify-center bg-white">
//     <Test/>
//       <Text className="font-bold">Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

 // const styles = StyleSheet.create({
// -   container: {
// -     flex: 1,
// -     backgroundColor: '#fff',
// -     alignItems: 'center',
// -     justifyContent: 'center',
// -   },
// - });
