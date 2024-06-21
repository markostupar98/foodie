import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({title, onPress, disabled, loading}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`p-4 bg-emerald-400 rounded-full justify-center items-center ${
        disabled ? 'bg-emerald-300' : 'bg-emerald-400'
      }`}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-bold">{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
