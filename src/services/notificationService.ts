import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import {BASE_URL} from '../lib/api';

// Register FCM token function
export const registerForPushNotifications = async (userId: number) => {
  try {
    const token = await messaging().getToken();
    await axios.post(`${BASE_URL}/api/users/register-token`, {
      userId,
      token,
    });
  } catch (error) {
    console.error('Error registering for push notifications:', error);
  }
};
