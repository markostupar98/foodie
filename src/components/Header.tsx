import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({title}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-row bg-emerald-300/70 h-20 items-center">
      <View className="mt-5 ml-3">
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          name="arrowleft"
          size={28}
          color="black"
        />
      </View>
      <View className="p-4 mt-5">
        <Text className="text-xl">{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;
