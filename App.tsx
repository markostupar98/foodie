import React, {useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';
import {store} from './src/store';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import axios from 'axios';
import {PermissionsAndroid} from 'react-native';
import Navigation from './src/components/Navigation';
import {BASE_URL} from './src/lib/api';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
