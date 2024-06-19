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

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
