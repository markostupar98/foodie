import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
  PermissionsAndroid,
} from 'react-native';
import {fetchOrders} from '../services/orderService';
import OrderList from '../components/OrderList';
import Background from '../components/Background';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {RootState} from '../store';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {Order} from '../types/types';
import {useSelector} from 'react-redux';
import {BASE_URL} from '../lib/api';
import DriverHeader from '../components/DriverHeader';

// const DriverHomeScreen: React.FC = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const colorScheme = useColorScheme();
//   const driverId = useSelector((state: RootState) => state.user.id);

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

//   const handleOrderTaken = (orderId: number) => {
//     setOrders(
//       orders.map(order =>
//         order.id === orderId ? {...order, status: 'taken'} : order,
//       ),
//     );
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#00ff00" />;
//   }

const DriverHomeScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const driverId = useSelector((state: RootState) => state.driver.id);

  useEffect(() => {
    if (!driverId) {
      console.log('Driver ID is not available yet.');
      return;
    }

    const registerFCMTokenForDriver = async (
      driverId: number,
      token: string,
    ) => {
      try {
        console.log('Registering FCM token for driver:', driverId);
        const response = await axios.post(
          `${BASE_URL}/api/notifications/register-token/driver`,
          {
            driverId,
            token,
          },
        );
        console.log('FCM token registered successfully.', response.data);
      } catch (error: any) {
        console.error(
          'Error registering FCM token:',
          error.response ? error.response.data : error.message,
        );
      }
    };

    const requestPermissionsAndRegisterToken = async () => {
      try {
        // Request permissions on Android
        const androidResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (androidResult === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted.');
        } else {
          console.error('Notification permission denied.');
        }

        // Request permissions on iOS
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
        } else {
          console.error('Notification permission denied on iOS.');
        }

        // Get the device token
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        registerFCMTokenForDriver(driverId, token);
        // Listen for token refresh
        const unsubscribeFromTokenRefresh = messaging().onTokenRefresh(
          token => {
            console.log('FCM Token refreshed:', token);
            registerFCMTokenForDriver(driverId, token);
          },
        );

        // Listen for messages
        const unsubscribeFromMessages = messaging().onMessage(
          async remoteMessage => {
            displayNotification(remoteMessage);
          },
        );

        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Message handled in the background!', remoteMessage);
          displayNotification(remoteMessage);
        });

        return () => {
          unsubscribeFromTokenRefresh();
          unsubscribeFromMessages();
        };
      } catch (error) {
        console.error(
          'Error requesting permissions or registering token:',
          error,
        );
      }
    };

    requestPermissionsAndRegisterToken();

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
  }, [driverId]);

  const handleOrderTaken = (orderId: number) => {
    setOrders(
      orders.map(order =>
        order.id === orderId ? {...order, status: 'delivering'} : order,
      ),
    );
  };

  const displayNotification = async (remoteMessage: any) => {
    // Create a channel (required for Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    if (remoteMessage.notification) {
      await notifee
        .displayNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          android: {
            channelId: 'default',
            pressAction: {
              id: 'default',
            },
          },
        })
        .catch(error => {
          console.error('Error displaying notification:', error);
        });
    } else {
      console.error('Remote message notification payload is missing.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <Background>
      <View className="flex-1">
        <DriverHeader />
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
                colorScheme === 'dark' ? 'text-white' : 'text-neutral-700'
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
