import React from 'react';
import {Text, TouchableOpacity, GestureResponderEvent} from 'react-native';

interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({onPress, title, loading}) => (
  <TouchableOpacity
    disabled={loading}
    className="rounded-full p-2.5 overflow-hidden bg-emerald-400"
    onPress={onPress}>
    <Text className="text-lg text-white font-semibold"> {title}</Text>
  </TouchableOpacity>
);

export default Button;
