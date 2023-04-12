import { createStackNavigator,CardStyleInterpolators,TransitionPresets } from '@react-navigation/stack';
import Search from "../Screen/SearchScreen"

import SearchCard from "../Components/SearchCard"

const HStack=createStackNavigator();
export default function SreachStack() {
  return (
    <HStack.Navigator  screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,headerShown: false}}>
      <HStack.Screen name="Search" component={Search} />
      <HStack.Screen name="Details" component={SearchCard} />
    
  </HStack.Navigator>
      
    )
}