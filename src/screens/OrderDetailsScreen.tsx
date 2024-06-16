import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchOrderDetails} from '../services/orderService';
import Header from '../components/Header';

const OrderDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {orderId} = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrderDetails = async () => {
      setLoading(true);
      try {
        const details = await fetchOrderDetails(orderId);
        if (details.error) {
          throw new Error(details.error);
        }
        setOrderDetails(details);
      } catch (error) {
        console.error('Error loading order details:', error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetails();
  }, [orderId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (!orderDetails) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text className="font-extrabold">No Order Details Found</Text>
      </View>
    );
  }

  return (
    <View className="bg-white flex-1">
      <Header title="Order Details" />
      <View className="relative py-4 my-5 shadow-sm">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white absolute z-10 rounded-full p-1 shadow top-5 left-2">
          <Ionicons name="arrow-back-circle" size={40} color="#00d062" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-lg">Order Details</Text>
        </View>
      </View>
      <View className="bg-emerald-300/100 opacity-50 flex-row px-4 items-center">
        <Image
          source={require('../../assets/deliveryguy.jpeg')}
          className="h-20 w-20 rounded-full"
        />
        <Text className="flex-1 pl-4 text-neutral-600">
          Restaurant: {orderDetails.restaurantName}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="bg-white pt-5">
        <View className="flex-row items-center space-x-3 py-2 px-2 bg-white rounded-3xl mx-2 mb-3 shadow-md">
          <Text className="font-bold text-emerald-700">Delivery Address:</Text>
          <Text className="flex-1 font-bold text-gray-600">
            {orderDetails.userAddress}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetailsScreen;
