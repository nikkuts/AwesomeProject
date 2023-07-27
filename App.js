import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from './Screens/Home';
import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';

const AuthStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="Home">
          <AuthStack.Screen options={{ headerShown: false, }}
          name="Login" component={LoginScreen} />
          <AuthStack.Screen options={{ headerShown: false, }} 
          name="Registration" component={RegistrationScreen} />
          <AuthStack.Screen options={{ headerShown: false, }}
          name="Home" component={Home} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};