// import {View, Text, TouchableOpacity, Image} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import React from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {Restaurants} from '../types/types';
// import {useSelector} from 'react-redux';
// import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';

// interface RestaurantCardProps {
//   item: Restaurants;
// }

// const RestaurantCard = ({item}: RestaurantCardProps) => {
//   const navigation = useNavigation();
//   // Geting user location
//   const userLocation = useSelector(state => ({
//     latitude: state.user.latitude,
//     longitude: state.user.longitude,
//   }));
//   // Get distance
//   const distance = getDistanceFromLatLonInKm(
//     userLocation.latitude,
//     userLocation.longitude,
//     item.latitude,
//     item.longitude,
//   );
//   return (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate('RestaurantScreen', {restaurantId: item.id})
//       }>
//       <View className="mx-2 my-2 bg-white rounded-3xl p-2 shadow-lg">
//         {item.image ? (
//           <Image
//             className="h-40 w-80 rounded-t-3xl"
//             source={{uri: item.image}}
//           />
//         ) : (
//           <View className="h-40 w-80 rounded-t-3xl bg-gray-200 flex items-center justify-center">
//             <Text className="text-gray-500">Image not available</Text>
//           </View>
//         )}
//         <View className="px-3 mt-2 space-y-2">
//           <Text className="font-semibold">{item.name}</Text>
//           <Text className="mb-2">Category: {item.categoryName}</Text>
//           <Text className="mb-2">Distance: {distance.toFixed(2)} km</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default RestaurantCard;

import {View, Text, TouchableOpacity, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';

interface RestaurantCardProps {
  item: {
    id: number;
    image: string;
    name: string;
    categoryName: string;
    latitude: number;
    longitude: number;
  };
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

const RestaurantCard = ({item, userLocation}: RestaurantCardProps) => {
  const navigation = useNavigation();

  // Provera validnosti koordinata pre nego što ih prosledimo funkciji za izračunavanje udaljenosti
  const isValidCoordinate = (coordinate: number | undefined) =>
    typeof coordinate === 'number' && !isNaN(coordinate);

  let distance = NaN;

  if (
    isValidCoordinate(userLocation.latitude) &&
    isValidCoordinate(userLocation.longitude) &&
    isValidCoordinate(item.latitude) &&
    isValidCoordinate(item.longitude)
  ) {
    distance = getDistanceFromLatLonInKm(
      userLocation.latitude,
      userLocation.longitude,
      item.latitude,
      item.longitude,
    );
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('RestaurantScreen', {restaurantId: item.id})
      }>
      <View className="mx-2 my-2 bg-white rounded-3xl p-2 shadow-lg">
        {item.image ? (
          <Image
            className="h-40 w-80 rounded-t-3xl"
            source={{uri: item.image}}
          />
        ) : (
          <View className="h-40 w-80 rounded-t-3xl bg-gray-200 flex items-center justify-center">
            <Text className="text-gray-500">Image not available</Text>
          </View>
        )}
        <View className="px-3 mt-2 space-y-2">
          <Text className="font-semibold">{item.name}</Text>
          <Text className="mb-2">Category: {item.categoryName}</Text>
          {isNaN(distance) ? (
            <Text className="mb-2 text-red-500">Distance: N/A</Text>
          ) : (
            <Text className="mb-2">Distance: {distance.toFixed(2)} km</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
