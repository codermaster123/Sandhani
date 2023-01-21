import { createStackNavigator,CardStyleInterpolators,TransitionPresets } from '@react-navigation/stack';
import Home from "../Screen/Home"
import Details from "../Screen/Details"

const HStack=createStackNavigator();
export default function HomeStack() {
  return (
    <HStack.Navigator  screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,headerShown: false}}>
      <HStack.Screen name="Home" component={Home} />
      <HStack.Screen name="Details" component={Details} />
      
  </HStack.Navigator>
      
    )
}