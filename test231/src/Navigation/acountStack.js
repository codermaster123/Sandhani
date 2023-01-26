import { createStackNavigator,CardStyleInterpolators,TransitionPresets } from '@react-navigation/stack';
import Login from "../Screen/Auth/Login"
import Registaton from "../Screen/Auth/Registation"
const HStack=createStackNavigator();
export default function HomeStack() {
  return (
    <HStack.Navigator  screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,headerShown: false}}>
      <HStack.Screen name="Registaton" component={Registaton} />
      <HStack.Screen name="Login" component={Login} />
  	</HStack.Navigator>
      
    )
}