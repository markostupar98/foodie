import {View, Text} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const HomeHeader = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-emerald-300 h-20 flex-row justify-between">
      <View className="items-center justify-center ml-5">
        <AntDesign name="back" size={24} color="white" />
      </View>
      <View className="items-center justify-center mx-auto">
        <Text className="text-xl font-bold text-white">FoodieGo</Text>
      </View>
      <View className="items-center justify-center mr-5">
        <AntDesign
          onPress={() => navigation.navigate('UserProfileScreen')}
          name="user"
          size={24}
          color="white"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;
