import React from 'react';
import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/RootStockParams';

const DriverHeader: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView className="bg-emerald-300 h-[60px] flex-row justify-between">
      <View className="items-center justify-center ml-5">
        <AntDesign name="back" size={24} color="white" />
      </View>
      <View className="items-center justify-center mx-auto">
        <Text className="text-xl font-bold text-white">FoodieGo</Text>
      </View>
    </SafeAreaView>
  );
};

export default DriverHeader;
