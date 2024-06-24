// import {View, Text, Image, TouchableOpacity} from 'react-native';
// import React from 'react';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {useDispatch, useSelector} from 'react-redux';
// import {addItem, updateItemQuantity} from '../store/slice/cartSlice';

// // Defining types
// interface DishItem {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   categoryName?: string;
// }

// interface DishRowProps {
//   item: DishItem;
// }

// interface RootState {
//   cart: {
//     items: CartItem[];
//   };
// }

// interface CartItem {
//   id: number;
//   quantity: number;
//   name?: string;
//   price?: number;
// }

// const DishRow = ({item}: DishRowProps) => {
//   const dispatch = useDispatch();
//   const cartItem = useSelector((state: RootState) =>
//     state.cart.items.find(cartItem => cartItem.id === item.id),
//   );

//   const handleAddToCart = () => {
//     dispatch(
//       addItem({id: item.id, name: item.name, price: item.price, quantity: 1}),
//     );
//   };

//   const handleUpdateQuantity = (quantity: number) => {
//     dispatch(updateItemQuantity({id: item.id, quantity}));
//   };

//   return (
//     <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
//       <Image
//         className="rounded-3xl"
//         style={{height: 100, width: 100}}
//         source={{uri: item.image}}
//       />
//       <View className="flex-1 space-y-3">
//         <View className="pl-3">
//           <Text className="text-xl">{item.name}</Text>
//           <Text className="text-gray-700">{item.categoryName}</Text>
//         </View>
//         <View className="flex-row justify-between pl-2 items-center">
//           <Text className="text-gray-700 text-lg font-bold">${item.price}</Text>
//           <View className="flex-row items-center">
//             <TouchableOpacity
//               className="p-1 rounded-full bg-emerald-400"
//               onPress={() => handleUpdateQuantity(-1)}>
//               <Entypo name="circle-with-minus" size={24} color="white" />
//             </TouchableOpacity>
//             <Text className="px-3">{cartItem ? cartItem.quantity : 0}</Text>
//             <TouchableOpacity
//               className="p-1 rounded-full bg-emerald-400"
//               onPress={handleAddToCart}>
//               <Entypo name="circle-with-plus" size={24} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default DishRow;

// import React from 'react';
// import {View, Text, Image, TouchableOpacity} from 'react-native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {useDispatch, useSelector} from 'react-redux';
// import {addItem, updateItemQuantity} from '../store/slice/cartSlice';

// // Defining types
// interface DishItem {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   categoryName?: string;
// }

// interface DishRowProps {
//   item: DishItem;
// }

// interface RootState {
//   cart: {
//     items: CartItem[];
//   };
// }

// interface CartItem {
//   id: number;
//   quantity: number;
//   name?: string;
//   price?: number;
// }

// const DishRow: React.FC<DishRowProps> = ({item}) => {
//   const dispatch = useDispatch();
//   const cartItem = useSelector((state: RootState) =>
//     state.cart.items.find(cartItem => cartItem.id === item.id),
//   );

//   const handleAddToCart = () => {
//     dispatch(
//       addItem({id: item.id, name: item.name, price: item.price, quantity: 1}),
//     );
//   };

//   const handleUpdateQuantity = (quantity: number) => {
//     dispatch(updateItemQuantity({id: item.id, quantity}));
//   };

//   return (
//     <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
//       <Image
//         className="rounded-3xl h-[100px] w-[100px]"
//         source={{uri: item.image}}
//       />
//       <View className="flex-1 space-y-3">
//         <View className="pl-3">
//           <Text className="text-xl">{item.name}</Text>
//           {item.categoryName && (
//             <Text className="text-gray-700">{item.categoryName}</Text>
//           )}
//         </View>
//         <View className="flex-row justify-between pl-2 items-center">
//           <Text className="text-gray-700 text-lg font-bold">${item.price}</Text>
//           <View className="flex-row items-center">
//             <TouchableOpacity
//               className="p-1 rounded-full bg-emerald-400"
//               onPress={() =>
//                 handleUpdateQuantity(cartItem ? cartItem.quantity - 1 : 0)
//               }
//               disabled={!cartItem || cartItem.quantity <= 0}>
//               <Entypo name="circle-with-minus" size={24} color="white" />
//             </TouchableOpacity>
//             <Text className="px-3">{cartItem ? cartItem.quantity : 0}</Text>
//             <TouchableOpacity
//               className="p-1 rounded-full bg-emerald-400"
//               onPress={handleAddToCart}>
//               <Entypo name="circle-with-plus" size={24} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default DishRow;
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {addItem, updateItemQuantity} from '../store/slice/cartSlice';

// Defining types
interface DishItem {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryName?: string;
}

interface DishRowProps {
  item: DishItem;
}

interface RootState {
  cart: {
    items: CartItem[];
  };
}

interface CartItem {
  id: number;
  quantity: number;
  name?: string;
  price?: number;
}

const DishRow: React.FC<DishRowProps> = ({item}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(cartItem => cartItem.id === item.id),
  );

  const handleAddToCart = () => {
    dispatch(
      addItem({id: item.id, name: item.name, price: item.price, quantity: 1}),
    );
  };

  const handleRemoveFromCart = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(updateItemQuantity({id: item.id, quantity: -1}));
    } else if (cartItem && cartItem.quantity === 1) {
      dispatch(updateItemQuantity({id: item.id, quantity: -1}));
    }
  };

  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
      <Image
        className="rounded-3xl h-[100px] w-[100px]"
        source={{uri: item.image}}
      />
      <View className="flex-1 space-y-3">
        <View className="pl-3">
          <Text className="text-xl">{item.name}</Text>
          {item.categoryName && (
            <Text className="text-gray-700">{item.categoryName}</Text>
          )}
        </View>
        <View className="flex-row justify-between pl-2 items-center">
          <Text className="text-gray-700 text-lg font-bold">${item.price}</Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="p-1 rounded-full bg-emerald-400"
              onPress={handleRemoveFromCart}
              disabled={!cartItem || cartItem.quantity <= 0}>
              <Entypo name="circle-with-minus" size={24} color="white" />
            </TouchableOpacity>
            <Text className="px-3">{cartItem ? cartItem.quantity : 0}</Text>
            <TouchableOpacity
              className="p-1 rounded-full bg-emerald-400"
              onPress={handleAddToCart}>
              <Entypo name="circle-with-plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DishRow;
