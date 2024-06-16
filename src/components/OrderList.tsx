import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {assignDriverToOrder} from '../services/orderService';
import {Restaurants, User} from '../types/types';

interface OrderListProps {
  restaurant: Restaurants;
  user: User;
  orderId: number;
}

// Interface for Redux state
interface RootState {
  driver: {
    id: number;
  };
}

const OrderList = ({restaurant, user, orderId}: OrderListProps) => {
  const navigation = useNavigation();
  const driverId = useSelector((state: RootState) => state.driver.id); // Pretpostavljamo da je driver ID u Redux store-u

  // Assiging driver to specific order
  const handleTakeOrder = async () => {
    try {
      await assignDriverToOrder(orderId, driverId);
      Alert.alert('Success', 'Order has been taken successfully!');
    } catch (error) {
      console.error('Error taking order:', error);
      Alert.alert('Error', 'Failed to take order.');
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetailsScreen', {orderId})}>
      <View className="mx-5 w-50 p-2  mt-10 bg-white rounded-3xl shadow-lg">
        <View className="w-full flex-row">
          <View>
            <View className="px-3 my-2 space-y-2 w-[70%]">
              <Text className="font-medium">From - {restaurant.name}</Text>
              <View className="flex-row items-center space-x-1">
                <FontAwesome name="map-marker" size={24} color="gray" />
                <Text className="text-xs font-semibold">
                  Delivery to - {user.address}
                </Text>
              </View>
            </View>
          </View>
          <View className="w-[30%] my-auto">
            <TouchableOpacity onPress={handleTakeOrder}>
              <Ionicons name="checkbox" size={40} color="green" />
              <Text className="mt-1 mr-7 font-extrabold">Take order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderList;
