import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { authStateChange } from "../redux/auth/authOperations";

import Home from '../Screens/Home';
import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen'; 
const AuthStack = createStackNavigator();

const Main = () => {
    const {isAuth} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authStateChange());
    }, []);
    
    if (isAuth) {
        return (
            <>
            <NavigationContainer>
                <AuthStack.Navigator>
                    <AuthStack.Screen options={{ headerShown: false, }}
                    name="Home" component={Home} />
                </AuthStack.Navigator>
            </NavigationContainer> 
            </>
        );   
    } else {
        return (
            <>
            <NavigationContainer>
                <AuthStack.Navigator initialRouteName="Login">
                    <AuthStack.Screen options={{ headerShown: false, }}
                    name="Login" component={LoginScreen} />
                    <AuthStack.Screen options={{ headerShown: false, }} 
                    name="Registration" component={RegistrationScreen} />
                </AuthStack.Navigator>
            </NavigationContainer> 
            </>
        );    
    }
};

export default Main;