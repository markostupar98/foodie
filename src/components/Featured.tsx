// import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
// import React from 'react';
// import RestaurantCard from './RestaurantCard';
// import {useNavigation} from '@react-navigation/native';
// import {Restaurants} from '../types/types';

// interface FeaturedProps {
//   name: string;
//   featuredRestaurants: Restaurants[];
//   userLocation: {
//     latitude: number;
//     longitude: number;
//   };
// }

// const Featured = ({name, featuredRestaurants, userLocation}: FeaturedProps) => {
//   const navigation = useNavigation();

//   const handleSeeAllPress = () => {
//     // Navigate to a screen where all restaurants can be viewed
//     navigation.navigate('AllRestaurantsScreen', {
//       restaurants: featuredRestaurants,
//     });
//   };

//   return (
//     <View>
//       <View className="flex-row justify-between items-center mt-2 px-4">
//         <View>
//           <Text className="font-bold text-lg">{name}</Text>
//         </View>
//         <TouchableOpacity onPress={handleSeeAllPress}>
//           <Text className="font-semibold">See all</Text>
//         </TouchableOpacity>
//       </View>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{paddingHorizontal: 15}}
//         className="overflow-visible py-5">
//         {featuredRestaurants.map((restaurant, index) => (
//           <RestaurantCard
//             item={restaurant}
//             key={index}
//             userLocation={userLocation}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default Featured;
import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import RestaurantCard from './RestaurantCard';
import {Restaurants} from '../types/types';

// Defining props
interface FeaturedProps {
  name: string;
  featuredRestaurants: Restaurants[];
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

// Defining navigation prop types
interface RootStackParamList {
  AllRestaurantsScreen: {restaurants: Restaurants[]};
}

const Featured: React.FC<FeaturedProps> = ({
  name,
  featuredRestaurants,
  userLocation,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSeeAllPress = () => {
    navigation.navigate('AllRestaurantsScreen', {
      restaurants: featuredRestaurants,
    });
  };

  return (
    <View>
      <View className="flex-row justify-between items-center mt-2 px-4">
        <Text className="font-bold text-lg">{name}</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text className="font-semibold">See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible py-5 px-5">
        {featuredRestaurants.map((restaurant, index) => (
          <RestaurantCard
            item={restaurant}
            key={index}
            userLocation={userLocation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Featured;
