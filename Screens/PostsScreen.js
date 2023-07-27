import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';

import DefaultScreenPosts from "./nestedScreens/DefaultScreenPosts";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  const navigation = useNavigation();

  const LogoutButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate("Login")}
    >
      <Image
      source={require('../assets/logout.png')}
      style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
  
  const BackButton = () => (
  <TouchableOpacity onPress={() => navigation.navigate("DefaultScreen")}
  >
  <Image
  source={require('../assets/arrowLeft.png')}
  style={{ width: 24, height: 24 }}
  />
  </TouchableOpacity>
  );

  return (
    <NestedScreen.Navigator initialRouteName="DefaultScreen">
      <NestedScreen.Screen name='DefaultScreen' component={DefaultScreenPosts} 
        options={{ 
          headerTitle: 'Публікації',
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {paddingHorizontal: 16},
          headerRightContainerStyle: {paddingHorizontal: 16},
          headerLeft: () => null,
          headerRight: LogoutButton, 
        }}
      />
      <NestedScreen.Screen name='Comment' component={CommentsScreen} 
        options={{ 
          headerTitle: 'Коментарі',
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {paddingHorizontal: 16},
          headerRightContainerStyle: {paddingHorizontal: 16},
          headerLeft: BackButton,
        }}
      />
      <NestedScreen.Screen name='Map' component={MapScreen} 
        options={{ 
          headerTitle: 'Map',
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {paddingHorizontal: 16},
          headerRightContainerStyle: {paddingHorizontal: 16},
          headerLeft: BackButton,
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;