// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import {Provider} from 'react-redux';
// import {store} from './src/store';
// import {} from 'react-native';

// import Navigation from './src/components/Navigation';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <Navigation />
//     </Provider>
//   );
// };

// export default App;

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

import {Alert} from 'react-native';
import {PermissionsAndroid} from 'react-native';

import Navigation from './src/components/Navigation';

const App = () => {
  useEffect(() => {
    // Request permissions on Android
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    ).then(result => {
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    });

    // Request permissions on iOS
    messaging()
      .requestPermission()
      .then(authStatus => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      });

    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
        // Send the token to your server to store it
      });

    // Listen for messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const displayNotification = async remoteMessage => {
    // Create a channel (required for Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId: 'default',
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
