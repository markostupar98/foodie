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
import {Alert, PermissionsAndroid} from 'react-native';
import Navigation from './src/components/Navigation';

const App = () => {
  useEffect(() => {
    // Request permissions on Android
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    )
      .then(result => {
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted.');
        } else {
          console.error('Notification permission denied.');
        }
      })
      .catch(error => {
        console.error('Error requesting notification permission:', error);
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
        } else {
          console.error('Notification permission denied on iOS.');
        }
      })
      .catch(error => {
        console.error(
          'Error requesting notification permission on iOS:',
          error,
        );
      });

    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
        // Send the token to your server to store it
      })
      .catch(error => {
        console.error('Error getting FCM token:', error);
      });

    // Listen for messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      displayNotification(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      displayNotification(remoteMessage);
    });

    return () => unsubscribe();
  }, []);

  const displayNotification = async remoteMessage => {
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

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
