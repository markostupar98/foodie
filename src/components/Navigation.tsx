import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import CartScreen from '../screens/CartScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import DriverSignInScreen from '../screens/auth/DriverSignInScreen';
import DriverSignUpScreen from '../screens/auth/DriverSignUpScreen';
import AllRestaurantsScreen from '../screens/AllRestaurantScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        {/* Auth Screens */}
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverSignInScreen"
          component={DriverSignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverSignUpScreen"
          component={DriverSignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RestaurantScreen"
          component={RestaurantScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllRestaurantsScreen"
          component={AllRestaurantsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
