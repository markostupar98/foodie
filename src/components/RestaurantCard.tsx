// import React from 'react';
// import {View, Text, TouchableOpacity, Image} from 'react-native';
// import {useNavigation, NavigationProp} from '@react-navigation/native';
// import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';
// import {RootStackParamList} from '../types/RootStockParams';

// // Defining props
// interface RestaurantCardProps {
//   item: {
//     id: number;
//     image: string;
//     name: string;
//     categoryName: string;
//     latitude: number | null;
//     longitude: number | null;
//   };
//   userLocation: {
//     latitude: number | null;
//     longitude: number | null;
//   };
// }

// // Type for navigation
// const RestaurantCard: React.FC<RestaurantCardProps> = ({
//   item,
//   userLocation,
// }) => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   // Provera validnosti koordinata pre nego što ih prosledimo funkciji za izračunavanje udaljenosti
//   const isValidCoordinate = (coordinate: number | null | undefined) =>
//     typeof coordinate === 'number' && !isNaN(coordinate);

//   let distance = 'Not available';

//   if (
//     isValidCoordinate(userLocation?.latitude) &&
//     isValidCoordinate(userLocation?.longitude) &&
//     isValidCoordinate(item.latitude) &&
//     isValidCoordinate(item.longitude)
//   ) {
//     distance = getDistanceFromLatLonInKm(
//       userLocation.latitude!,
//       userLocation.longitude!,
//       item.latitude!,
//       item.longitude!,
//     ).toFixed(2);
//   }

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
//           {distance === 'Not available' ? (
//             <Text className="mb-2 text-red-500">Distance: {distance}</Text>
//           ) : (
//             <Text className="mb-2">Distance: {distance} km</Text>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default RestaurantCard;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';
import {RootStackParamList} from '../types/RootStockParams';

// Defining props
interface RestaurantCardProps {
  item: {
    id: number;
    image: string;
    name: string;
    categoryName: string;
    latitude: number | null;
    longitude: number | null;
  };
  userLocation: {
    latitude: number | null;
    longitude: number | null;
  };
}

// Type for navigation
const RestaurantCard: React.FC<RestaurantCardProps> = ({
  item,
  userLocation,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colorScheme = useColorScheme();

  // Provera validnosti koordinata pre nego što ih prosledimo funkciji za izračunavanje udaljenosti
  const isValidCoordinate = (coordinate: number | null | undefined) =>
    typeof coordinate === 'number' && !isNaN(coordinate);

  let distance = 'Not available';

  if (
    isValidCoordinate(userLocation?.latitude) &&
    isValidCoordinate(userLocation?.longitude) &&
    isValidCoordinate(item.latitude) &&
    isValidCoordinate(item.longitude)
  ) {
    distance = getDistanceFromLatLonInKm(
      userLocation.latitude!,
      userLocation.longitude!,
      item.latitude!,
      item.longitude!,
    ).toFixed(2);
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('RestaurantScreen', {restaurantId: item.id})
      }>
      <View
        className={`mx-2 my-2 p-2 rounded-3xl shadow-lg ${
          colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
        {item.image ? (
          <Image
            className="h-40 w-80 rounded-t-3xl"
            source={{uri: item.image}}
          />
        ) : (
          <View
            className={`h-40 w-80 rounded-t-3xl ${
              colorScheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            } flex items-center justify-center`}>
            <Text className="text-gray-500">Image not available</Text>
          </View>
        )}
        <View className="px-3 mt-2 space-y-2">
          <Text
            className={`font-semibold ${
              colorScheme === 'dark' ? 'text-white' : 'text-black'
            }`}>
            {item.name}
          </Text>
          <Text
            className={`mb-2 ${
              colorScheme === 'dark' ? 'text-gray-400' : 'text-black'
            }`}>
            Category: {item.categoryName}
          </Text>
          {distance === 'Not available' ? (
            <Text className="mb-2 text-red-500">Distance: {distance}</Text>
          ) : (
            <Text
              className={`mb-2 ${
                colorScheme === 'dark' ? 'text-gray-400' : 'text-black'
              }`}>
              Distance: {distance} km
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
