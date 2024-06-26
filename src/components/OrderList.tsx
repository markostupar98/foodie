// import React from 'react';
// import {View, Text, TouchableOpacity, Alert} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useNavigation, NavigationProp} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import {assignDriverToOrder} from '../services/orderService';
// import {Restaurants, User} from '../types/types';
// import {RootStackParamList} from '../types/RootStockParams';

// // Defining props for OrderList
// interface OrderListProps {
//   restaurant: Restaurants;
//   user: User;
//   orderId: number;
// }

// // Interface for Redux state
// interface RootState {
//   driver: {
//     id: number;
//   };
// }

// const OrderList: React.FC<OrderListProps> = ({restaurant, user, orderId}) => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const driverId = useSelector((state: RootState) => state.driver.id);

//   // Assiging driver to specific order
//   const handleTakeOrder = async () => {
//     try {
//       await assignDriverToOrder(orderId, driverId);
//       Alert.alert('Success', 'Order has been taken successfully!');
//     } catch (error) {
//       console.error('Error taking order:', error);
//       Alert.alert('Error', 'Failed to take order.');
//     }
//   };

//   return (
//     <TouchableOpacity
//       onPress={() => navigation.navigate('OrderDetailsScreen', {orderId})}>
//       <View className="mx-5 w-50 p-2 mt-10 bg-white rounded-3xl shadow-lg">
//         <View className="w-full flex-row">
//           <View className="px-3 my-2 space-y-2 w-[70%]">
//             <Text className="font-medium">From - {restaurant.name}</Text>
//             <View className="flex-row items-center space-x-1">
//               <FontAwesome name="map-marker" size={24} color="gray" />
//               <Text className="text-xs font-semibold">
//                 Delivery to - {user.address}
//               </Text>
//             </View>
//           </View>
//           <View className="w-[30%] my-auto items-center">
//             <TouchableOpacity onPress={handleTakeOrder}>
//               <Ionicons name="checkbox" size={40} color="green" />
//               <Text className="mt-1 font-extrabold">Take order</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default OrderList;

import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {assignDriverToOrder} from '../services/orderService';
import {Restaurants, User} from '../types/types';
import {RootStackParamList} from '../types/RootStockParams';

// Defining props for OrderList
interface OrderListProps {
  restaurant: Restaurants;
  user: User;
  orderId: number;
  status: string; // Add status prop
  onOrderTaken: (orderId: number) => void; // Add callback prop for order taken
}

// Interface for Redux state
interface RootState {
  driver: {
    id: number;
  };
}

const OrderList: React.FC<OrderListProps> = ({
  restaurant,
  user,
  orderId,
  status,
  onOrderTaken,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const driverId = useSelector((state: RootState) => state.driver.id);

  // Assiging driver to specific order
  const handleTakeOrder = async () => {
    try {
      await assignDriverToOrder(orderId, driverId);
      Alert.alert('Success', 'Order has been taken successfully!');
      onOrderTaken(orderId); // Notify parent component that the order has been taken
    } catch (error) {
      console.error('Error taking order:', error);
      Alert.alert('Error', 'Failed to take order.');
    }
  };

  return (
    <View
      className={`mx-5 w-50 p-2 mt-10 rounded-3xl shadow-lg ${
        status === 'taken' ? 'bg-green-300' : 'bg-white'
      }`}>
      <View className="w-full flex-row">
        <View className="px-3 my-2 space-y-2 w-[70%]">
          <Text className="font-medium">From - {restaurant.name}</Text>
          <View className="flex-row items-center space-x-1">
            <FontAwesome name="map-marker" size={24} color="gray" />
            <Text className="text-xs font-semibold">
              Delivery to - {user.address}
            </Text>
          </View>
        </View>
        <View className="w-[30%] my-auto items-center">
          {status !== 'taken' && (
            <TouchableOpacity onPress={handleTakeOrder}>
              <Ionicons name="checkbox" size={40} color="green" />
              <Text className="mt-1 font-extrabold">Take order</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default OrderList;
