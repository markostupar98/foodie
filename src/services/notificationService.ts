import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

// Register FCM token function
export const registerForPushNotifications = async (userId: number) => {
  try {
    const token = await messaging().getToken();
    await axios.post('http://10.0.2.2:3000/api/users/register-token', {
      userId,
      token,
    });
  } catch (error) {
    console.error('Error registering for push notifications:', error);
  }
};
