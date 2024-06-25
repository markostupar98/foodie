// // export default Categories;
// import React, {useState} from 'react';
// import {View, Text, FlatList, Pressable, Image} from 'react-native';

// // Defining props
// interface CategoryItem {
//   id: number;
//   image: string;
//   name: string;
// }

// interface CategoriesProps {
//   categories: CategoryItem[];
//   onCategorySelect: (categoryId: number) => void;
// }

// const Categories: React.FC<CategoriesProps> = ({
//   categories,
//   onCategorySelect,
// }) => {
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

//   const handlePress = (categoryId: number) => {
//     setSelectedCategory(categoryId);
//     onCategorySelect(categoryId);
//   };

//   return (
//     <View className="mt-5 w-full">
//       <Text className="text-xl ml-2 text-neutral-500 font-semibold">
//         Categories
//       </Text>
//       <View>
//         <FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           data={categories}
//           keyExtractor={item => item.id.toString()}
//           renderItem={({item}) => (
//             <Pressable onPress={() => handlePress(item.id)}>
//               <View
//                 className={`rounded-full justify-center items-center p-3 w-15 mt-5 mx-3 h-20 ${
//                   selectedCategory === item.id ? 'bg-emerald-400' : 'bg-white'
//                 }`}>
//                 <Image
//                   className="h-14 w-14 rounded-3xl"
//                   source={{uri: item.image}}
//                 />
//               </View>
//               <View className="items-center my-2">
//                 <Text
//                   className={`font-semibold ${
//                     selectedCategory === item.id
//                       ? 'text-white'
//                       : 'text-neutral-500'
//                   }`}>
//                   {item.name}
//                 </Text>
//               </View>
//             </Pressable>
//           )}
//         />
//       </View>
//     </View>
//   );
// };

// export default Categories;

import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  useColorScheme,
} from 'react-native';

// Defining props
interface CategoryItem {
  id: number;
  image: string;
  name: string;
}

interface CategoriesProps {
  categories: CategoryItem[];
  onCategorySelect: (categoryId: number | null) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  onCategorySelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const colorScheme = useColorScheme();

  const handlePress = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      onCategorySelect(null); // Isključuje pretragu po kategorijama
    } else {
      setSelectedCategory(categoryId);
      onCategorySelect(categoryId);
    }
  };

  return (
    <View className="mt-5 w-full">
      <Text
        className={`text-xl ml-2 font-semibold ${
          colorScheme === 'dark' ? 'text-white' : 'text-neutral-500'
        }`}>
        Categories
      </Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Pressable onPress={() => handlePress(item.id)}>
              <View
                className={`rounded-full justify-center items-center p-3 w-15 mt-5 mx-3 h-20 ${
                  selectedCategory === item.id
                    ? 'bg-emerald-400'
                    : colorScheme === 'dark'
                    ? 'bg-gray-800'
                    : 'bg-white'
                }`}>
                <Image
                  className="h-14 w-14 rounded-3xl"
                  source={{uri: item.image}}
                />
              </View>
              <View className="items-center my-2">
                <Text
                  className={`font-semibold ${
                    selectedCategory === item.id
                      ? 'text-white'
                      : colorScheme === 'dark'
                      ? 'text-gray-400'
                      : 'text-neutral-500'
                  }`}>
                  {item.name}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default Categories;
