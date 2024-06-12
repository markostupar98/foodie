import {View, Text, Image} from 'react-native';
import React from 'react';
import FirstCarouselImage from '../../assets/carousel/carousel1.webp';
import Swiper from 'react-native-swiper';
import Background from '../components/Background';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/types/RootStockParams';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WelcomeScreen'
>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <Background>
      <View className="flex-1 justify-start pt-[60px] items-center">
        <View className="my-5">
          <Text className="text-xl font-bold text-emerald-300/100">
            Discover restaurants
          </Text>
          <Text className="text-xl font-bold text-emerald-400">
            In your area
          </Text>
        </View>
        <View className="justify-center flex-2 mt-10">
          <Swiper autoplay>
            <View className="mb-20 justify-center items-center">
              <Image
                source={FirstCarouselImage}
                className="h-full w-full"
                resizeMode="contain"
              />
            </View>
            {/* <View className="flex-1 mb-20 justify-center items-center">
              <Image
                source={require('../../../assets/carousel/carousel3.webp')}
                className="h-full w-full"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1 mb-20 justify-center items-center">
              <Image
                source={require('../../../assets/carousel/carousel2.webp')}
                className="h-full w-full"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1 mb-20 justify-center items-center">
              <Image
                source={require('../../assets/carousel/carousel1.webp')}
                className="h-full w-full"
                resizeMode="contain"
              />
            </View> */}
          </Swiper>
          <View className="flex-1">
            <View className="w-90 mx-7 my-2">
              <Button
                title="Sign In"
                onPress={() => {
                  navigation.navigate('SignInScreen');
                }}
              />
            </View>
            <View className="mt-5 p-5">
              <Text className="text-neutral-400">
                If you don't have an account
              </Text>
            </View>
            <View className="justify-end flex-row mx-5">
              <Button
                title="Create account"
                onPress={() => {
                  navigation.navigate('SignUpScreen');
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default WelcomeScreen;
