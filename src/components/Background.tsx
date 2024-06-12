// src/components/Background.js
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

type BackgroundProps = {
  children: React.ReactNode;
};
const Background = ({children}: BackgroundProps) => (
  <ImageBackground
    source={require('../../assets/backgroundImage/vecteezy_flat-design-abstract-background-soft-liquid-shapes-template_.jpg')}
    style={styles.background}
    resizeMode="cover">
    {children}
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default Background;
