// // src/components/Background.js
// import React from 'react';
// import {ImageBackground, StyleSheet} from 'react-native';
// import lightBg from '../../assets/backgroundImage/lightBg.jpg';
// import darkBg from '../../assets/backgroundImage/darkBg.jpg';

// type BackgroundProps = {
//   children: React.ReactNode;
// };
// const Background = ({children}: BackgroundProps) => (
//   <ImageBackground source={} style={styles.background} resizeMode="cover">
//     {children}
//   </ImageBackground>
// );

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
// });

// export default Background;

// src/components/Background.js
import React from 'react';
import {ImageBackground, StyleSheet, useColorScheme} from 'react-native';
import lightBg from '../../assets/backgroundImage/lightBg.jpg';
import darkBg from '../../assets/backgroundImage/darkBg.jpg';

type BackgroundProps = {
  children: React.ReactNode;
};

const Background = ({children}: BackgroundProps) => {
  const colorScheme = useColorScheme();
  const backgroundImage = colorScheme === 'dark' ? darkBg : lightBg;

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover">
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default Background;
