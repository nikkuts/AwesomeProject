import { TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostsScreen from './Screens/PostsScreen';
import CreatePostsScreen from './Screens/CreatePostsScreen';
import ProfileScreen from './Screens/ProfileScreen';

const MainTab = createBottomTabNavigator();

export const Home = () => {
  
    return (
      <MainTab.Navigator initialRouteName="Posts"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: { height: 83, paddingBottom: 23, paddingHorizontal: '14%' }, 
        }}
      >
        <MainTab.Screen name="Posts" component={PostsScreen}
          options={{ tabBarIcon: () => (
              <Image
                source={require('./assets/grid.png')}
                style={{ width: 40, height: 40 }}
              />
            ), 
            headerTitle: 'Публікації',
            headerTitleAlign: 'center',
            headerLeftContainerStyle: {paddingHorizontal: 16},
            headerRightContainerStyle: {paddingHorizontal: 16},
            headerRight: () => (
              <Image
                source={require('./assets/logout.png')}
                style={{ width: 24, height: 24 }}
              />
            )
          }}
        />
        <MainTab.Screen name="CreatePosts" component={CreatePostsScreen} 
          options={{ tabBarIcon: () => (
            <TouchableOpacity style={{
              alignItems: 'center', justifyContent: 'center', 
              width: 70, height: 40, backgroundColor: '#FF6C00', borderRadius: 20 
              }}
            >
              <Image
                source={require('./assets/union.png')}
                style={{ width: 13, height: 13 }}
              />
            </TouchableOpacity>
            )
          }}
        />
        <MainTab.Screen name="Profile" component={ProfileScreen} 
          options={{ tabBarIcon: () => (
            <Image
              source={require('./assets/user.png')}
              style={{ width: 40, height: 40 }}
            />
          )
        }}
        />
      </MainTab.Navigator>
    );
  };

