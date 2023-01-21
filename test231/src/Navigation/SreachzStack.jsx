import { createStackNavigator,CardStyleInterpolators,TransitionPresets } from '@react-navigation/stack';
import Sreach from "../Screen/Sreach"
import Details from "../Screen/Details"

const HStack=createStackNavigator();
export default function SreachStack() {
  return (
    <HStack.Navigator  screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,headerShown: false}}>
      <HStack.Screen name="Sreach" component={Sreach} />
      <HStack.Screen name="Details" component={Details} />
      
  </HStack.Navigator>
      
    )
}