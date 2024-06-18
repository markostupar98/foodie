// Featured.tsx
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import RestaurantCard from './RestaurantCard';
import {useNavigation} from '@react-navigation/native';
import {Restaurants} from '../types/types';

interface FeaturedProps {
  name: string;
  featuredRestaurants: Restaurants[];
}

const Featured = ({name, featuredRestaurants}: FeaturedProps) => {
  const navigation = useNavigation();

  const handleSeeAllPress = () => {
    // Navigate to a screen where all restaurants can be viewed
    navigation.navigate('AllRestaurantsScreen', {
      restaurants: featuredRestaurants,
    });
  };

  const limitedRestaurants = featuredRestaurants.slice(0, 5);

  return (
    <View>
      <View className="flex-row justify-between items-center mt-2 px-4">
        <View>
          <Text className="font-bold text-lg">{name}</Text>
        </View>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text className="font-semibold">See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
        className="overflow-visible py-5">
        {limitedRestaurants.map((restaurant, index) => (
          <RestaurantCard item={restaurant} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Featured;
