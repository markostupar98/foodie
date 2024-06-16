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
import DeliveryScreen from '../screens/DeliveryScreen';
import OrderPrepScreen from '../screens/OrderPrepScreen';
import DriverHomeScreen from '../screens/DriverHomeScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const isUserLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const isDriverLoggedIn = useSelector((state: any) => state.driver.isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isUserLoggedIn && !isDriverLoggedIn ? (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen
              name="DriverSignInScreen"
              component={DriverSignInScreen}
            />
            <Stack.Screen
              name="DriverSignUpScreen"
              component={DriverSignUpScreen}
            />
          </>
        ) : isUserLoggedIn ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="RestaurantScreen"
              component={RestaurantScreen}
            />
            <Stack.Screen
              name="AllRestaurantsScreen"
              component={AllRestaurantsScreen}
            />
            <Stack.Screen
              name="CartScreen"
              options={{presentation: 'modal'}}
              component={CartScreen}
            />
            <Stack.Screen
              name="OrderPrepScreen"
              options={{presentation: 'fullScreenModal'}}
              component={OrderPrepScreen}
            />
            <Stack.Screen
              name="DeliveryScreen"
              options={{presentation: 'fullScreenModal'}}
              component={DeliveryScreen}
            />
            <Stack.Screen
              name="UserProfileScreen"
              options={{presentation: 'fullScreenModal'}}
              component={UserProfileScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="DriverHomeScreen"
              component={DriverHomeScreen}
            />
            <Stack.Screen
              name="OrderDetailsScreen"
              component={OrderDetailsScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
