import { StatusBar } from 'expo-status-bar';

import React,{useState,useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';


// import {useFonts} from 'expo-font';
// import AppLoading from "expo-app-loading"


import Mainstack from "./src/Navigation/Mainstack";

import client from "./react-query-client"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {AuthContext,AuthProvider} from "./Context";



export default function App() {
 
  return (
    <QueryClientProvider client={client}>
   <AuthProvider>
   <Mainstack/>
   </AuthProvider>
  </QueryClientProvider>
   
  );
}
