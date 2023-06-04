import { StatusBar } from 'expo-status-bar';

import React,{useState,useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
// import { createNativeStackNavigator,CardStyleInterpolators,TransitionPresets } from '@react-navigation/native-stack';
import { createStackNavigator,CardStyleInterpolators,TransitionPresets } from '@react-navigation/stack';

// import {useFonts} from 'expo-font';
// import AppLoading from "expo-app-loading"
import * as SplashScreen from 'expo-splash-screen';
import Welcome from "../Screen/Welcome";
import Tab from "./Tab";

import {AuthContext} from "../../Context";


const Stack=createStackNavigator();

export default function App() {
  const [appReady,isAppready]=useState(false);
  const {welcomed}=useContext(AuthContext);
 
  // const [fontLoad]=useFonts({
  //   Kalpurush:require("./fonts/Kalpurush.ttf")
  // })
  // if(!fontLoad){
  //   return <AppLoading/>
  // }

  return (
  <>
     <StatusBar style="dark" />
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown: false}}>
      {!welcomed?
      <Stack.Screen name="Welcome">{(props)=> <Welcome  {...props}/>}</Stack.Screen>
      :
      <Stack.Screen name="Tab" component={Tab} />
      }
      </Stack.Navigator>
      
  </NavigationContainer>
</>
   
  );
}