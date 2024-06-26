// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
//   useColorScheme,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   addItem,
//   updateItemQuantity,
//   removeItem,
// } from '../store/slice/cartSlice';
// import {
//   calculateDelivery,
//   getDistanceFromLatLonInKm,
// } from '../lib/deliveryFeeandTimeCalc';
// import {fetchRestaurantDetails} from '../services/restaurantService';
// import {fetchUserProfile} from '../services/userService';
// import {Restaurants} from '../types/types';
// import {User} from '../types/types';
// import {createOrder} from '../services/orderService';
// import {RootState} from '../store';
// import {RootStackParamList} from '../types/RootStockParams';

// type CartScreenRouteProp = RouteProp<RootStackParamList, 'CartScreen'>;

// interface DeliveryInfo {
//   fee: number;
//   time: number;
// }

// const CartScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [userProfile, setUserProfile] = useState<User | null>(null);
//   const [restaurant, setRestaurant] = useState<Restaurants | null>(null);
//   const route = useRoute<CartScreenRouteProp>();
//   const userId = useSelector((state: RootState) => state.user.id);
//   const {restaurantId} = route.params;
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const colorScheme = useColorScheme();

//   const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
//     fee: 0,
//     time: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadDetails = async () => {
//       setLoading(true);
//       try {
//         const restaurantResult = await fetchRestaurantDetails(
//           restaurantId,
//           true,
//         );
//         if (restaurantResult.error) {
//           throw new Error(restaurantResult.error);
//         }

//         const userProfileResult = await fetchUserProfile(userId);
//         if (userProfileResult.error) {
//           throw new Error(userProfileResult.error);
//         }

//         const restaurant = restaurantResult.restaurant;
//         const profile = userProfileResult.profile;
//         if (restaurant && profile) {
//           const distance = getDistanceFromLatLonInKm(
//             profile.latitude!,
//             profile.longitude!,
//             restaurant.latitude!,
//             restaurant.longitude!,
//           );

//           const {deliveryFee, deliveryTime} = calculateDelivery(distance);
//           setUserProfile(profile);
//           setRestaurant(restaurant);
//           setDeliveryInfo({fee: deliveryFee, time: deliveryTime});
//         } else {
//           throw new Error('Missing restaurant or user profile data');
//         }
//       } catch (error: any) {
//         console.error('Error loading details:', error);
//         Alert.alert('Error', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDetails();
//   }, [restaurantId, userId]);

//   const handleUpdateQuantity = (dishId: number, quantity: number) => {
//     const cartItem = cartItems.find(item => item.id === dishId);
//     if (cartItem) {
//       const newQuantity = cartItem.quantity + quantity;
//       if (newQuantity <= 0) {
//         dispatch(removeItem({id: dishId}));
//       } else {
//         dispatch(updateItemQuantity({id: dishId, quantity}));
//       }
//     }
//   };

//   const calculateSubtotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0,
//     );
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#00ff00" />;
//   }

//   const handlePlaceOrder = async () => {
//     if (!userId || !restaurantId || !userProfile || !userProfile.address) {
//       Alert.alert(
//         'Error',
//         'All necessary information is not available for placing the order.',
//       );
//       return;
//     }

//     const total = calculateSubtotal() + deliveryInfo.fee;
//     setLoading(true);

//     try {
//       await createOrder(
//         userId,
//         restaurantId,
//         userProfile.address,
//         cartItems,
//         total,
//       );
//       Alert.alert('Success', 'Order placed successfully!');
//       navigation.navigate('OrderPrepScreen', {
//         restaurantId: restaurantId,
//         userId: userId,
//       });
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const userAddress = userProfile
//     ? userProfile.address
//     : 'Address not available';

//   return (
//     <View
//       className={`flex-1 ${colorScheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
//       <View className="relative py-4 my-5 shadow-sm">
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           className={`absolute z-10 rounded-full p-1 shadow top-5 left-2 ${
//             colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'
//           }`}>
//           <Ionicons name="arrow-back-circle" size={40} color="#00d062" />
//         </TouchableOpacity>
//         <View>
//           <Text
//             className={`text-center font-bold text-lg ${
//               colorScheme === 'dark' ? 'text-white' : 'text-black'
//             }`}>
//             Your Cart
//           </Text>
//         </View>
//       </View>
//       <View
//         className={`flex-row px-4 items-center ${
//           colorScheme === 'dark' ? 'bg-gray-800' : 'bg-emerald-300/100'
//         } opacity-50`}>
//         <Image
//           source={require('../../assets/deliveryguy.jpeg')}
//           className="h-20 w-20 rounded-full"
//         />
//         <Text
//           className={`flex-1 pl-4 ${
//             colorScheme === 'dark' ? 'text-white' : 'text-neutral-600'
//           }`}>
//           Deliver in {deliveryInfo.time.toFixed(0)} minutes To {userAddress}
//         </Text>
//       </View>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{paddingBottom: 50}}
//         className={`pt-5 ${colorScheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
//         {cartItems.map((dish, index) => (
//           <View
//             key={index}
//             className={`flex-row items-center space-x-3 py-2 px-2 ${
//               colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'
//             } rounded-3xl mx-2 mb-3 shadow-md`}>
//             <Text
//               className={`font-bold ${
//                 colorScheme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'
//               }`}>
//               {dish.quantity} x
//             </Text>
//             <Image
//               className="h-14 w-14 rounded-full"
//               source={{uri: dish.image}}
//             />
//             <Text
//               className={`flex-1 font-bold ${
//                 colorScheme === 'dark' ? 'text-white' : 'text-gray-600'
//               }`}>
//               {dish.name}
//             </Text>
//             <Text
//               className={`font-semibold ${
//                 colorScheme === 'dark' ? 'text-white' : 'text-neutral-600'
//               } text-base`}>
//               $ {dish.price}
//             </Text>
//             <TouchableOpacity
//               className={`rounded-full ${
//                 colorScheme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-400'
//               }`}
//               onPress={() => handleUpdateQuantity(dish.id, -1)}>
//               <Entypo name="circle-with-minus" size={20} color="white" />
//             </TouchableOpacity>
//             <Text
//               className={`px-3 ${
//                 colorScheme === 'dark' ? 'text-white' : 'text-black'
//               }`}>
//               {dish.quantity}
//             </Text>
//             <TouchableOpacity
//               className={`rounded-full ${
//                 colorScheme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-400'
//               }`}
//               onPress={() => handleUpdateQuantity(dish.id, 1)}>
//               <Entypo name="circle-with-plus" size={20} color="white" />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>
//       {/* Totals */}
//       <View
//         className={`p-6 px-8 rounded-t-3xl space-y-4 ${
//           colorScheme === 'dark' ? 'bg-gray-800' : 'bg-emerald-500'
//         }`}>
//         <View className="flex-row justify-between">
//           <Text className="text-white">Subtotal</Text>
//           <Text className="text-white font-extrabold">
//             ${calculateSubtotal().toFixed(2)}
//           </Text>
//         </View>
//         <View className="flex-row justify-between">
//           <Text className="text-white">Delivery Fee</Text>
//           <Text className="text-white font-extrabold">
//             $ {deliveryInfo.fee.toFixed(2)}
//           </Text>
//         </View>
//         <View className="flex-row justify-between">
//           <Text className="text-white">Total</Text>
//           <Text className="text-white font-extrabold">
//             ${(calculateSubtotal() + deliveryInfo.fee).toFixed(2)}
//           </Text>
//         </View>
//         <View>
//           <TouchableOpacity
//             onPress={handlePlaceOrder}
//             className="bg-emerald-400/100 p-3 rounded-full">
//             <Text className="text-white text-center font-bold text-lg">
//               Place Order
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default CartScreen;

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItem,
  updateItemQuantity,
  removeItem,
} from '../store/slice/cartSlice';
import {
  calculateDelivery,
  getDistanceFromLatLonInKm,
} from '../lib/deliveryFeeandTimeCalc';
import {fetchRestaurantDetails} from '../services/restaurantService';
import {fetchUserProfile} from '../services/userService';
import {Restaurants} from '../types/types';
import {User} from '../types/types';
import {createOrder} from '../services/orderService';
import {RootState} from '../store';
import {RootStackParamList} from '../types/RootStockParams';

type CartScreenRouteProp = RouteProp<RootStackParamList, 'CartScreen'>;

interface DeliveryInfo {
  fee: number;
  time: number;
}

const CartScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurants | null>(null);
  const route = useRoute<CartScreenRouteProp>();
  const userId = useSelector((state: RootState) => state.user.id);
  const {restaurantId} = route.params;
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const colorScheme = useColorScheme();

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fee: 0,
    time: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      try {
        const restaurantResult = await fetchRestaurantDetails(
          restaurantId,
          true,
        );
        if (restaurantResult.error) {
          throw new Error(restaurantResult.error);
        }

        const userProfileResult = await fetchUserProfile(userId);
        if (userProfileResult.error) {
          throw new Error(userProfileResult.error);
        }

        const restaurant = restaurantResult.restaurant;
        const profile = userProfileResult.profile;
        if (restaurant && profile) {
          const distance = getDistanceFromLatLonInKm(
            profile.latitude!,
            profile.longitude!,
            restaurant.latitude!,
            restaurant.longitude!,
          );

          const {deliveryFee, deliveryTime} = calculateDelivery(distance);
          setUserProfile(profile);
          setRestaurant(restaurant);
          setDeliveryInfo({fee: deliveryFee, time: deliveryTime});
        } else {
          throw new Error('Missing restaurant or user profile data');
        }
      } catch (error: any) {
        console.error('Error loading details:', error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [restaurantId, userId]);

  const handleUpdateQuantity = (dishId: number, quantity: number) => {
    const cartItem = cartItems.find(item => item.id === dishId);
    if (cartItem) {
      const newQuantity = cartItem.quantity + quantity;
      if (newQuantity <= 0) {
        dispatch(removeItem({id: dishId}));
      } else {
        dispatch(updateItemQuantity({id: dishId, quantity}));
      }
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const handlePlaceOrder = async () => {
    if (!userId || !restaurantId || !userProfile || !userProfile.address) {
      Alert.alert(
        'Error',
        'All necessary information is not available for placing the order.',
      );
      return;
    }

    const total = calculateSubtotal() + deliveryInfo.fee;
    setLoading(true);

    try {
      await createOrder(
        userId,
        restaurantId,
        userProfile.address,
        cartItems,
        total,
      );
      Alert.alert('Success', 'Order placed successfully!');
      navigation.navigate('OrderPrepScreen', {
        restaurantId: restaurantId,
        userId: userId,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const userAddress = userProfile
    ? userProfile.address
    : 'Address not available';

  return (
    <View
      className={`flex-1 ${colorScheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <View className="relative py-4 my-5 shadow-sm">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={`absolute z-10 rounded-full p-1 shadow top-5 left-2 ${
            colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <Ionicons name="arrow-back-circle" size={40} color="#00d062" />
        </TouchableOpacity>
        <View>
          <Text
            className={`text-center font-bold text-lg ${
              colorScheme === 'dark' ? 'text-white' : 'text-black'
            }`}>
            Your Cart
          </Text>
        </View>
      </View>
      <View
        className={`flex-row px-4 items-center ${
          colorScheme === 'dark' ? 'bg-gray-800' : 'bg-emerald-300/100'
        } opacity-50`}>
        <Image
          source={require('../../assets/deliveryguy.jpeg')}
          className="h-20 w-20 rounded-full"
        />
        <Text
          className={`flex-1 pl-4 ${
            colorScheme === 'dark' ? 'text-white' : 'text-neutral-600'
          }`}>
          Deliver in {deliveryInfo.time.toFixed(0)} minutes To {userAddress}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className={`pt-5 ${colorScheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        {cartItems.map((dish, index) => {
          console.log('Dish:', dish); // Log dish data to debug
          return (
            <View
              key={index}
              className={`flex-row items-center space-x-3 py-2 px-2 ${
                colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } rounded-3xl mx-2 mb-3 shadow-md`}>
              <Text
                className={`font-bold ${
                  colorScheme === 'dark'
                    ? 'text-emerald-300'
                    : 'text-emerald-700'
                }`}>
                {dish.quantity} x
              </Text>
              {dish.image ? (
                <Image
                  className="h-14 w-14 rounded-full"
                  source={{uri: dish.image}}
                />
              ) : (
                <View className="h-14 w-14 rounded-full bg-gray-300" />
              )}
              <Text
                className={`flex-1 font-bold ${
                  colorScheme === 'dark' ? 'text-white' : 'text-gray-600'
                }`}>
                {dish.name}
              </Text>
              <Text
                className={`font-semibold ${
                  colorScheme === 'dark' ? 'text-white' : 'text-neutral-600'
                } text-base`}>
                $ {dish.price}
              </Text>
              <TouchableOpacity
                className={`rounded-full ${
                  colorScheme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-400'
                }`}
                onPress={() => handleUpdateQuantity(dish.id, -1)}>
                <Entypo name="circle-with-minus" size={20} color="white" />
              </TouchableOpacity>
              <Text
                className={`px-3 ${
                  colorScheme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                {dish.quantity}
              </Text>
              <TouchableOpacity
                className={`rounded-full ${
                  colorScheme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-400'
                }`}
                onPress={() => handleUpdateQuantity(dish.id, 1)}>
                <Entypo name="circle-with-plus" size={20} color="white" />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* Totals */}
      <View
        className={`p-6 px-8 rounded-t-3xl space-y-4 ${
          colorScheme === 'dark' ? 'bg-gray-800' : 'bg-emerald-500'
        }`}>
        <View className="flex-row justify-between">
          <Text className="text-white">Subtotal</Text>
          <Text className="text-white font-extrabold">
            ${calculateSubtotal().toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-white">Delivery Fee</Text>
          <Text className="text-white font-extrabold">
            $ {deliveryInfo.fee.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-white">Total</Text>
          <Text className="text-white font-extrabold">
            ${(calculateSubtotal() + deliveryInfo.fee).toFixed(2)}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={handlePlaceOrder}
            className="bg-emerald-400/100 p-3 rounded-full">
            <Text className="text-white text-center font-bold text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
