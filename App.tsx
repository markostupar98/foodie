/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {} from 'react-native';

import Navigation from './src/components/Navigation';

const App = () => {
  return (
    // <Provider store={store}>
    <Navigation />
    // </Provider>
  );
};

export default App;
