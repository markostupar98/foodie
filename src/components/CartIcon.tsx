import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

interface RouteParams {
  restaurantId: string; // Asumiram da je restaurantId tipa string
}

interface RootState {
  user: {
    id: string;
  };
  cart: {
    items: CartItem[];
  };
}

interface CartItem {
  quantity: number;
  price: number;
}

const CartIcon = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {restaurantId} = route.params as RouteParams;
  const userId = useSelector((state: RootState) => state.user.id);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <View className="absolute bottom-5 w-full z-50">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CartScreen', {
            restaurantId: restaurantId,
            userId: userId,
          })
        }
        className="bg-emerald-400 flex-row justify-between items-center mx-5 rounded-full p-4 py-3">
        <View className="p-2 px-4 rounded-full bg-emerald-300/10">
          <Text className="font-extrabold text-white text-lg">
            {totalItems}
          </Text>
        </View>
        <Text className="flex-1 text-center font-extrabold text-white text-lg">
          View Cart
        </Text>
        <Text className="font-extrabold text-white text-lg">
          $ {totalPrice.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;
