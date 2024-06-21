import {Restaurants} from './types';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  CartScreen: {restaurantId: number; userId: number};
  UserProfileScreen: undefined;
  OrderDetailsScreen: {orderId: number};
  RestaurantScreen: {restaurantId: number};
  DriverHomeScreen: undefined;
  DriverSignInScreen: undefined;
  HomeScreen: undefined;
  AllRestaurantsScreen: {restaurantId: number; restaurants: Restaurants[]};
  DriverSignUpScreen: undefined;
  DeliveryScreen: {restaurantId: number; userId: number};
};
