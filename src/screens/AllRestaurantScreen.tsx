// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import {RootState} from '../store';
// import {RootStackParamLists} from '../types/RootStockParams';
// import Header from '../components/Header';
// import SearchBar from '../components/SearchBar';
// import {fetchUserProfile} from '../services/userService';
// import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';

// type AllRestaurantsScreenRouteProp = RouteProp<'AllRestaurantsScreen'>;

// interface RestaurantItem {
//   id: number;
//   name: string;
//   image: string;
//   categoryName: string;
//   latitude: number;
//   longitude: number;
//   address: string;
// }

// const PAGE_SIZE = 5;

// const AllRestaurantsScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const route = useRoute<AllRestaurantsScreenRouteProp>();
//   const {restaurants} = route.params;
//   const userId = useSelector((state: RootState) => state.user.id);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(1);
//   const [userProfile, setUserProfile] = useState<any>(null);

//   useEffect(() => {
//     const fetchUserProfileData = async () => {
//       try {
//         const userProfileData = await fetchUserProfile(userId);
//         if (userProfileData.error) {
//           throw new Error(userProfileData.error);
//         }
//         if (
//           userProfileData.profile &&
//           userProfileData.profile.latitude &&
//           userProfileData.profile.longitude
//         ) {
//           setUserProfile(userProfileData.profile);
//         } else {
//           console.error('User profile data is incomplete.');
//         }
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchUserProfileData();
//   }, [userId]);

//   const filteredRestaurants = restaurants.filter((restaurant: RestaurantItem) =>
//     restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   const paginatedRestaurants = filteredRestaurants.slice(
//     (page - 1) * PAGE_SIZE,
//     page * PAGE_SIZE,
//   );

//   const renderItem = ({item}: {item: RestaurantItem}) => {
//     const distance = userProfile
//       ? getDistanceFromLatLonInKm(
//           userProfile.latitude,
//           userProfile.longitude,
//           item.latitude,
//           item.longitude,
//         ).toFixed(2)
//       : 'N/A';

//     return (
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('RestaurantScreen', {restaurantId: item.id})
//         }>
//         <View className="m-2 p-5 w-full bg-white rounded-3xl shadow-lg">
//           {item.image ? (
//             <Image
//               className="h-40 w-full rounded-t-3xl"
//               source={{uri: item.image}}
//             />
//           ) : (
//             <View className="h-40 w-80 rounded-t-3xl bg-gray-200 flex items-center justify-center">
//               <Text className="text-gray-500">Image not available</Text>
//             </View>
//           )}
//           <View className="px-3 mt-2 space-y-2">
//             <Text className="font-semibold">{item.name}</Text>
//             <Text className="mb-2">Category: {item.categoryName}</Text>
//             <Text className="mb-2">Distance: {distance} km</Text>
//           </View>
//           <View className="flex-row items-center space-x-1">
//             <FontAwesome name="map-marker" size={24} color="gray" />
//             <Text className="text-xs">Nearby - {item.address}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View className="flex-1">
//       <Header title="All Restaurants" />
//       <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
//       <FlatList
//         data={paginatedRestaurants}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={{paddingBottom: 20}}
//         ListFooterComponent={
//           filteredRestaurants.length > PAGE_SIZE && (
//             <View className="flex-row justify-between px-4 ">
//               <TouchableOpacity
//                 disabled={page === 1}
//                 onPress={() => setPage(page - 1)}>
//                 <Text
//                   className="font-extrabold"
//                   style={{opacity: page === 1 ? 0.5 : 1}}>
//                   Previous
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 disabled={page * PAGE_SIZE >= filteredRestaurants.length}
//                 onPress={() => setPage(page + 1)}>
//                 <Text
//                   className="font-extrabold"
//                   style={{
//                     opacity:
//                       page * PAGE_SIZE >= filteredRestaurants.length ? 0.5 : 1,
//                   }}>
//                   Next
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           )
//         }
//       />
//     </View>
//   );
// };

// export default AllRestaurantsScreen;

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {RootStackParamList} from '../types/RootStockParams';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import {fetchUserProfile} from '../services/userService';
import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';
import {Restaurants, Category} from '../types/types';

type AllRestaurantsScreenRouteProp = RouteProp<
  RootStackParamList,
  'AllRestaurantsScreen'
>;

const PAGE_SIZE = 5;

const AllRestaurantsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<AllRestaurantsScreenRouteProp>();
  const {restaurants} = route.params;
  const userId = useSelector((state: RootState) => state.user.id);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const userProfileData = await fetchUserProfile(userId);
        if (userProfileData.error) {
          throw new Error(userProfileData.error);
        }
        if (
          userProfileData.profile &&
          userProfileData.profile.latitude &&
          userProfileData.profile.longitude
        ) {
          setUserProfile(userProfileData.profile);
        } else {
          console.error('User profile data is incomplete.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfileData();
  }, [userId]);

  const filteredRestaurants = restaurants.filter((restaurant: Restaurants) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const paginatedRestaurants = filteredRestaurants.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const renderItem = ({item}: {item: Restaurants}) => {
    const distance = userProfile
      ? getDistanceFromLatLonInKm(
          userProfile.latitude ?? 0, // Osiguraj da je vrijednost broj
          userProfile.longitude ?? 0, // Osiguraj da je vrijednost broj
          item.latitude ?? 0, // Osiguraj da je vrijednost broj
          item.longitude ?? 0, // Osiguraj da je vrijednost broj
        ).toFixed(2)
      : 'N/A';

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RestaurantScreen', {restaurantId: item.id})
        }>
        <View className="m-2 p-5 w-full bg-white rounded-3xl shadow-lg">
          {item.image ? (
            <Image
              className="h-40 w-full rounded-t-3xl"
              source={{uri: item.image}}
            />
          ) : (
            <View className="h-40 w-80 rounded-t-3xl bg-gray-200 flex items-center justify-center">
              <Text className="text-gray-500">Image not available</Text>
            </View>
          )}
          <View className="px-3 mt-2 space-y-2">
            <Text className="font-semibold">{item.name}</Text>
            <Text className="mb-2">
              Category: {item.categoryName.name}{' '}
              {/* Prikazivanje imena kategorije */}
            </Text>
            <Text className="mb-2">Distance: {distance} km</Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <FontAwesome name="map-marker" size={24} color="gray" />
            <Text className="text-xs">Nearby - {item.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">
      <Header title="All Restaurants" />
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={paginatedRestaurants}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 20}}
        ListFooterComponent={
          filteredRestaurants.length > PAGE_SIZE ? (
            <View className="flex-row justify-between px-4 ">
              <TouchableOpacity
                disabled={page === 1}
                onPress={() => setPage(page - 1)}>
                <Text
                  className="font-extrabold"
                  style={{opacity: page === 1 ? 0.5 : 1}}>
                  Previous
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={page * PAGE_SIZE >= filteredRestaurants.length}
                onPress={() => setPage(page + 1)}>
                <Text
                  className="font-extrabold"
                  style={{
                    opacity:
                      page * PAGE_SIZE >= filteredRestaurants.length ? 0.5 : 1,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default AllRestaurantsScreen;
