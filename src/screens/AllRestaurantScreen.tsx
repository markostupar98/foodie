// import {View, Text, TouchableOpacity, Image} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import React from 'react';
// import {useNavigation} from '@react-navigation/native';

// interface RestaurantItem {
//   id: string;
//   name: string;
//   image?: string; // Oznaka da je image opcionalan
//   categoryName: string;
//   address: string;
// }

// interface AllRestaurantsScreenProps {
//   item?: RestaurantItem; // Oznaka da je item opcionalan
// }

// const AllRestaurantsScreen: React.FC<AllRestaurantsScreenProps> = ({item}) => {
//   const navigation = useNavigation();

//   // Provjera da li item postoji
//   if (!item) {
//     return (
//       <View className="mx-2 my-2 bg-white rounded-3xl p-2 shadow-lg">
//         <Text className="text-gray-500">No restaurant data available</Text>
//       </View>
//     );
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
// //         ) : (
// //           <View className="h-40 w-80 rounded-t-3xl bg-gray-200 flex items-center justify-center">
// //             <Text className="text-gray-500">Image not available</Text>
// //           </View>
// //         )}
// //         <View className="px-3 mt-2 space-y-2">
// //           <Text className="font-semibold">{item.name}</Text>
// //           <Text className="mb-2">Category: {item.categoryName}</Text>
// //         </View>
// //         <View className="flex-row items-center space-x-1">
// //           <FontAwesome name="map-marker" size={24} color="gray" />
// //           <Text className="text-xs">Nearby - {item.address}</Text>
// //         </View>
// //       </View>
// //     </TouchableOpacity>
// //   );
// // };

// // export default AllRestaurantsScreen;

// import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import React, {useState} from 'react';
// import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
// import {RootStackParamList} from '../types/RootStockParams';
// import Header from '../components/Header';
// import SearchBar from '../components/SearchBar';

// type AllRestaurantsScreenRouteProp = RouteProp<
//   RootStackParamList,
//   'AllRestaurantsScreen'
// >;

// const AllRestaurantsScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const route = useRoute<AllRestaurantsScreenRouteProp>();
//   const {restaurants} = route.params;
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredRestaurants = restaurants.filter(restaurant =>
//     restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   const renderItem = ({item}: {item: RestaurantItem}) => (
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
//         </View>
//         <View className="flex-row items-center space-x-1">
//           <FontAwesome name="map-marker" size={24} color="gray" />
//           <Text className="text-xs">Nearby - {item.address}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <>
//       <Header title="All Restaurants" />
//       <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
//       <FlatList
//         data={filteredRestaurants}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={{paddingBottom: 20}}
//       />
//     </>
//   );
// };

// export default AllRestaurantsScreen;

// AllRestaurantsScreen.tsx
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/RootStockParams';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

type AllRestaurantsScreenRouteProp = RouteProp<
  RootStackParamList,
  'AllRestaurantsScreen'
>;

const PAGE_SIZE = 5;

const AllRestaurantsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<AllRestaurantsScreenRouteProp>();
  const {restaurants} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const paginatedRestaurants = filteredRestaurants.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const renderItem = ({item}: {item: RestaurantItem}) => (
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
        </View>
        <View className="flex-row items-center space-x-1">
          <FontAwesome name="map-marker" size={24} color="gray" />
          <Text className="text-xs">Nearby - {item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <Header title="All Restaurants" />
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={paginatedRestaurants}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 20}}
        ListFooterComponent={
          filteredRestaurants.length > PAGE_SIZE && (
            <View className="flex-row justify-between px-4 py-2">
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
          )
        }
      />
    </View>
  );
};

export default AllRestaurantsScreen;
