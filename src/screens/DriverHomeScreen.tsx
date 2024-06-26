// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   useColorScheme,
// } from 'react-native';
// import {fetchOrders} from '../services/orderService';
// import OrderList from '../components/OrderList';
// import Background from '../components/Background';
// import {Order} from '../types/types';
// import HomeHeader from '../components/HomeHeader';

// const DriverHomeScreen: React.FC = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const colorScheme = useColorScheme();

//   useEffect(() => {
//     const loadOrders = async () => {
//       setLoading(true);
//       try {
//         const fetchedOrders = await fetchOrders();
//         setOrders(fetchedOrders);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadOrders();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#00ff00" />;
//   }

//   return (
//     <Background>
//       <View className="flex-1">
//         <HomeHeader />
//         <ScrollView className="flex-1">
//           {orders.length > 0 ? (
//             orders.map(order => (
//               <OrderList
//                 key={order.id}
//                 orderId={order.id}
//                 restaurant={order.restaurant}
//                 user={order.user}
//               />
//             ))
//           ) : (
//             <Text
//               className={`mt-10 text-center text-2xl ${
//                 colorScheme === 'dark' ? 'text-white' : 'text-black'
//               }`}>
//               No orders available at time!
//             </Text>
//           )}
//         </ScrollView>
//       </View>
//     </Background>
//   );
// };

// export default DriverHomeScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import {fetchOrders} from '../services/orderService';
import OrderList from '../components/OrderList';
import Background from '../components/Background';
import {Order} from '../types/types';
import HomeHeader from '../components/HomeHeader';
import {useSelector} from 'react-redux';

const DriverHomeScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const driverId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleOrderTaken = (orderId: number) => {
    setOrders(
      orders.map(order =>
        order.id === orderId ? {...order, status: 'taken'} : order,
      ),
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <Background>
      <View className="flex-1">
        <HomeHeader />
        <ScrollView className="flex-1">
          {orders.length > 0 ? (
            orders.map(order => (
              <OrderList
                key={order.id}
                orderId={order.id}
                restaurant={order.restaurant}
                user={order.user}
                status={order.status}
                onOrderTaken={handleOrderTaken}
              />
            ))
          ) : (
            <Text
              className={`mt-10 text-center text-2xl ${
                colorScheme === 'dark' ? 'text-white' : 'text-black'
              }`}>
              No orders available at time!
            </Text>
          )}
        </ScrollView>
      </View>
    </Background>
  );
};

export default DriverHomeScreen;
