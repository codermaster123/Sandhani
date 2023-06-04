import React from "react";
import { StatusBar } from 'expo-status-bar';
import URL from "../URL";

import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from "./Homestack"
import SreachStack from "./SreachzStack"
import AcountStack from "./acountStack";
import Settings from "../Screen/settings"
import SearchSereen from "../Screen/SearchScreen"

import Ionicons from "react-native-vector-icons/Ionicons"
import {AuthProvider} from "../../Context"

import Header from "../Components/header"
const Tab=createBottomTabNavigator();

          
export default function BottomTab() {
    return (
      <>
       <StatusBar style="light" />
     
       <Tab.Navigator screenOptions={{headerStyle: {
      backgroundColor: "#B91C1C",
      
      height:85
      
    },headerTintColor: 'white', title: 'Sandhani',headerShown: true,tabBarShowLabel:false,tabBarInactiveTintColor: 'white',tabBarActiveTintColor: 'white',tabBarStyle: {backgroundColor: '#B91C1C',},}}>
        
           <Tab.Screen name='Homestack' component={HomeStack}  options={{tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused?"home":"home-outline"} color={color} size={size} />
          )}}/>
           <Tab.Screen name='SreachStack' component={SreachStack} options={{tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused?"search":"search-outline"} color={color} size={size} />
          )}}/>
           <Tab.Screen name='profile' component={AcountStack} options={{tabBarIcon: ({color, size, focused}) => (
            <Ionicons name={focused?"person-circle":"person-circle-outline"} color={color} size={size} />
          )}}/>
          
       <Tab.Screen name='settings' component={Settings} options={{tabBarIcon: ({color, size, focused}) => (
         <Ionicons name={focused?"settings":"settings-outline"} color={color} size={size} />
          )}}/>

          
      </Tab.Navigator>
      </>
    
    )
}