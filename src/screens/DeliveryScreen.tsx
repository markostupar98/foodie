// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import MapView, {Marker} from 'react-native-maps';
// import {useSelector} from 'react-redux';
// import {fetchRestaurantDetailsComplete} from '../services/restaurantService';
// import {fetchUserProfile} from '../services/userService';
// import {
//   calculateDelivery,
//   getDistanceFromLatLonInKm,
// } from '../lib/deliveryFeeandTimeCalc';
// import {fetchOrderDetails} from '../services/orderService';

// interface RouteParams {
//   restaurantId: string;
// }
// interface UserProfile {
//   latitude: number;
//   longitude: number;
//   name: string;
//   description: string;
// }

// interface RootState {
//   user: {
//     id: number;
//   };
// }

// const DeliveryScreen = () => {
//   const route = useRoute();
//   const userId = useSelector((state: RootState) => state.user.id); // Accessing user id from Redux store
//   const {restaurantId} = route.params as RouteParams;
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [restaurant, setRestaurant] = useState(null);

//   const [deliveryInfo, setDeliveryInfo] = useState({fee: 0, time: 0});
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null); // State to store user profile

//   // Fetching order data
//   // useEffect(() => {
//   //   const loadOrderDetails = async () => {
//   //     setLoading(true);
//   //     try {
//   //       const details = await fetchOrderDetails(orderId);
//   //       if (details.error) {
//   //         throw new Error(details.error);
//   //       }
//   //       setOrderDetails(details);
//   //     } catch (error) {
//   //       console.error("Error loading details:", error);
//   //       Alert.alert("Error", error.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   loadOrderDetails();
//   // }, [orderId]);
//   // Fetching restaurant and user data
//   useEffect(() => {
//     const loadDetails = async () => {
//       setLoading(true);
//       try {
//         const restaurantResult = await fetchRestaurantDetailsComplete(
//           restaurantId,
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
//             profile.latitude,
//             profile.longitude,
//             restaurant.latitude,
//             restaurant.longitude,
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

//   const navigation = useNavigation();

//   if (loading) {
//     return <ActivityIndicator size="large" />;
//   }

//   if (!userProfile) {
//     return <Text>No profile data available.</Text>;
//   }
//   return (
//     <View className="flex-1">
//       <MapView
//         initialRegion={{
//           latitude: userProfile.latitude,
//           longitude: userProfile.longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//         className="flex-1"
//         mapType="standard">
//         <Marker
//           coordinate={{
//             latitude: userProfile.latitude,
//             longitude: userProfile.longitude,
//           }}
//           title={userProfile.name}
//           description={userProfile.description}
//           pinColor="#6B7280"
//         />
//       </MapView>
//       <View className="rounded-t-3xl -mt-12 bg-white relative">
//         <View className="flex-row justify-between px-2 pt-5">
//           <View>
//             <Text className="text-lg text-gray-500 font-semibold">
//               Estimated Arrival
//             </Text>
//             <Text className="text-lg text-gray-500 font-extrabold">
//               In {deliveryInfo.time.toFixed(0)} minutes
//             </Text>
//             <Text className="mt-2 text-gray-600 font-semibold">
//               Your order is waiting for driver to pick up
//             </Text>
//           </View>
//           <Image
//             className="w-24 h-24"
//             source={require('../../assets/deliveryguy.jpeg')}
//           />
//         </View>
//         <View className="bg-emerald-400/100 p-2 flex-row justify-between items-center rounded-full my-5 mx-2">
//           <View className="p-1 rounded-full bg-emerald-400/100">
//             {/* <Image
//                 className="h-16 w-16 rounded-full"
//                 source={require("../../assets/driver.jpeg")}
//               /> */}
//           </View>
//           <View className="flex-1 ml-3">
//             <Text className="text-lg font-bold text-white">
//               You will get notified when driver picks up your order
//             </Text>
//             {/* <Text className="text-lg font-bold text-white">
//                 Your delivery driver -
//               </Text> */}
//           </View>
//           <View className="flex-row items-center space-x-3 mr-3">
//             <TouchableOpacity
//               onPress={() => navigation.navigate('HomeScreen')}
//               className="bg-white p-2 rounded-full">
//               <Ionicons name="exit-outline" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default DeliveryScreen;

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import {fetchRestaurantDetailsComplete} from '../services/restaurantService';
import {fetchUserProfile} from '../services/userService';
import {
  calculateDelivery,
  getDistanceFromLatLonInKm,
} from '../lib/deliveryFeeandTimeCalc';

interface RouteParams {
  restaurantId: string;
}
interface UserProfile {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}

interface RootState {
  user: {
    id: number;
  };
}

const DeliveryScreen = () => {
  const route = useRoute();
  const userId = useSelector((state: RootState) => state.user.id); // Accessing user id from Redux store
  const {restaurantId} = route.params as RouteParams;
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [restaurant, setRestaurant] = useState<any>(null);

  const [deliveryInfo, setDeliveryInfo] = useState({fee: 0, time: 0});
  const [loading, setLoading] = useState(true);

  // Fetching restaurant and user data
  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      try {
        const restaurantResult = await fetchRestaurantDetailsComplete(
          restaurantId,
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
            profile.latitude,
            profile.longitude,
            restaurant.latitude,
            restaurant.longitude,
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

  const navigation = useNavigation();

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!userProfile) {
    return <Text>No profile data available.</Text>;
  }

  const mapUri = `https://www.openstreetmap.org/export/embed.html?bbox=${
    userProfile.longitude - 0.01
  },${userProfile.latitude - 0.01},${userProfile.longitude + 0.01},${
    userProfile.latitude + 0.01
  }&layer=mapnik&marker=${userProfile.latitude},${userProfile.longitude}`;

  return (
    <View className="flex-1">
      <View style={styles.mapContainer}>
        <WebView source={{uri: mapUri}} style={styles.webView} />
      </View>
      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <View className="flex-row justify-between px-2 pt-5">
          <View>
            <Text className="text-lg text-gray-500 font-semibold">
              Estimated Arrival
            </Text>
            <Text className="text-lg text-gray-500 font-extrabold">
              In {deliveryInfo.time.toFixed(0)} minutes
            </Text>
            <Text className="mt-2 text-gray-600 font-semibold">
              Your order is waiting for driver to pick up
            </Text>
          </View>
          <Image
            className="w-24 h-24"
            source={require('../../assets/deliveryguy.jpeg')}
          />
        </View>
        <View className="bg-emerald-400/100 p-2 flex-row justify-between items-center rounded-full my-5 mx-2">
          <View className="p-1 rounded-full bg-emerald-400/100">
            {/* <Image
                className="h-16 w-16 rounded-full"
                source={require("../../assets/driver.jpeg")}
              /> */}
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">
              You will get notified when driver picks up your order
            </Text>
            {/* <Text className="text-lg font-bold text-white">
                Your delivery driver - 
              </Text> */}
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScreen')}
              className="bg-white p-2 rounded-full">
              <Ionicons name="exit-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 580,
    marginTop: 10,
  },
  webView: {
    flex: 1,
  },
});

export default DeliveryScreen;
