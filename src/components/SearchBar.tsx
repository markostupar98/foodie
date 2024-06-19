// SearchBar.tsx
import React from 'react';
import {View, Text, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({value, onChangeText}) => {
  return (
    <View className="flex-row items-center h-[65px] space-x-2 my-4 px-4">
      <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
        <AntDesign name="search1" size={20} color="black" />
        <TextInput
          placeholder="Search for Restaurants"
          className="ml-2 flex-1 text-neutral-900"
          value={value}
          onChangeText={onChangeText}
        />
        {/* <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
          <FontAwesome name="map-marker" size={24} color="black" />
          <Text className="text-gray-600">Banja Luka,RS</Text>
        </View> */}
      </View>
    </View>
  );
};

export default SearchBar;
