import {View, Text, TouchableOpacity, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Restaurants} from '../types/types';

interface RestaurantCardProps {
  item: Restaurants;
}

const RestaurantCard = ({item}: RestaurantCardProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('RestaurantScreen', {restaurantId: item.id})
      }>
      <View className="mr-6 p-2 bg-white rounded-3xl shadow-lg">
        <Image className="h-36 w-64 rounded-t-3xl" source={{uri: item.image}} />
        <View className="px-3 my-2 space-y-2">
          <Text>{item.name}</Text>
          <Text>{item.categoryName}</Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <FontAwesome name="map-marker" size={24} color="gray" />
          <Text className="text-xs">Nearby - {item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
