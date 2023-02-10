import { createStackNavigator,CardStyleInterpolators,TransitionPresets } from '@react-navigation/stack';
import Login from "../Screen/Auth/Login"
import Registaton from "../Screen/Auth/Registation"
import SelectSandhani from "../Screen/Select"
import profile from "../Screen/Profile"
import Profile from '../Screen/Profile';
const HStack=createStackNavigator();
export default function HomeStack() {
  return (
    <HStack.Navigator  screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,headerShown: false}}>
      
      <HStack.Screen name="Registaton" component={Registaton} />
      <HStack.Screen name="Login" component={Login} />
      <HStack.Screen name="Profile" component={Profile} />
      
  	</HStack.Navigator>
      
    )
}