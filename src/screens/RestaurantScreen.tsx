// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import DishRow from '../components/DishRow';
// import CartIcon from '../components/CartIcon';
// import {useSelector} from 'react-redux';
// import {fetchRestaurantDetailsBasic} from '../services/restaurantService';

// const RestaurantScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {restaurantId} = route.params;
//   const userId = useSelector(state => state.user.id); // Accessing user id from Redux store
//   const [restaurant, setRestaurant] = useState(null);
//   const [dishes, setDishes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadRestaurantDetails = async () => {
//       const response = await fetchRestaurantDetailsBasic(restaurantId);
//       if (response.error) {
//         console.log(response.error);
//         return;
//       }
//       setRestaurant(response.restaurant);
//       setDishes(response.dishes || []); // Ensure dishes is always an array
//       setLoading(false);
//     };
//     console.log(restaurantId);
//     loadRestaurantDetails();
//   }, [restaurantId]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#00ff00" />;
//   }

//   if (!restaurant) {
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Text className="font-extrabold">No Restaurant Found</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <CartIcon />
//       <ScrollView>
//         <View className="relative">
//           <Image className="w-full h-72" source={{uri: restaurant.image}} />
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             className="absolute top-10 left-4 bg-gray-50 p-2 rounded-full">
//             <Ionicons name="arrow-back-circle" size={40} color="#00d062" />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
//           className="bg-white -mt-12 pt-6">
//           <View className="px-5">
//             <Text className="text-3xl font-semibold">{restaurant.name}</Text>
//             <View className="mr-6 bg-white rounded-3xl shadow-lg">
//               <View className="px-3 pb-2 space-y-2">
//                 <Text className="font-semibold text-base">
//                   {restaurant.category
//                     ? restaurant.category.name
//                     : 'No Category'}
//                 </Text>
//               </View>
//               <View className="flex-row items-center space-x-1">
//                 <FontAwesome name="map-marker" size={24} color="gray" />
//                 <Text className="text-xs">Nearby - {restaurant.address}</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//         <View className="pb-36 bg-white">
//           <Text className="px-4 py-4 text-2xl font-semibold">Menu</Text>
//           {dishes.map((dish, index) => (
//             <DishRow item={dish} key={index} />
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default RestaurantScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import DishRow from '../components/DishRow';
import CartIcon from '../components/CartIcon';
import {useSelector} from 'react-redux';
import {fetchRestaurantDetails} from '../services/restaurantService';
import {fetchUserProfile} from '../services/userService';
import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {restaurantId} = route.params;
  const userId = useSelector(state => state.user.id); // Accessing user id from Redux store
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(null); // Add state for distance

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      try {
        const restaurantResponse = await fetchRestaurantDetails(
          restaurantId,
          true,
        );
        if (restaurantResponse.error) {
          throw new Error(restaurantResponse.error);
        }
        setRestaurant(restaurantResponse.restaurant);
        setDishes(restaurantResponse.dishes || []);

        const userProfileResponse = await fetchUserProfile(userId);
        if (userProfileResponse.error) {
          throw new Error(userProfileResponse.error);
        }
        const userProfile = userProfileResponse.profile;
        setUserProfile(userProfile);

        if (restaurantResponse.restaurant && userProfile) {
          const distance = getDistanceFromLatLonInKm(
            userProfile.latitude,
            userProfile.longitude,
            restaurantResponse.restaurant.latitude,
            restaurantResponse.restaurant.longitude,
          );
          setDistance(distance.toFixed(2)); // Calculate and set distance
        }
      } catch (error) {
        console.error('Error loading details:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [restaurantId, userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (!restaurant) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text className="font-extrabold">No Restaurant Found</Text>
      </View>
    );
  }

  return (
    <View>
      <CartIcon />
      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{uri: restaurant.image}} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-10 left-4 bg-gray-50 p-2 rounded-full">
            <Ionicons name="arrow-back-circle" size={40} color="#00d062" />
          </TouchableOpacity>
        </View>
        <View
          style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
          className="bg-white -mt-12 pt-6">
          <View className="px-5">
            <Text className="text-3xl font-semibold">{restaurant.name}</Text>
            <View className="mr-6 bg-white rounded-3xl shadow-lg">
              <View className=" pb-2 space-y-2">
                <Text className="font-semibold text-base">
                  {restaurant.category
                    ? restaurant.category.name
                    : 'No Category'}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <FontAwesome name="map-marker" size={24} color="gray" />
                <Text className="text-xs">Nearby - {restaurant.address}</Text>
              </View>
              {distance && (
                <Text className="text-xs mt-2 ml-1.5">
                  Distance: {distance} km
                </Text>
              )}
            </View>
          </View>
        </View>
        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-semibold">Menu</Text>
          {dishes.map((dish, index) => (
            <DishRow item={dish} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantScreen;
