export type RootStackParamList = {
  WelcomeScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  CartScreen: {restaurantId: number; userId: number};
  UserProfileScreen: undefined;
  OrderDetailsScreen: {orderId: number};
  RestaurantScreen: {restaurantId: number};
};
