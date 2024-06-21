// import React, {useEffect, useState} from 'react';
// import {View, ScrollView} from 'react-native';
// import HomeHeader from '../components/HomeHeader';
// import Categories from '../components/Categories';
// import SearchBar from '../components/SearchBar';
// import Featured from '../components/Featured';
// import {getCategories} from '../services/categoryService';
// import {getRestaurants} from '../services/restaurantService';
// import Background from '../components/Background';
// import {useSelector} from 'react-redux';
// import {fetchUserProfile} from '../services/userService';
// import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';

// const HomeScreen = () => {
//   const [categories, setCategories] = useState([]);
//   const [restaurants, setRestaurants] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [userProfile, setUserProfile] = useState(null);

//   const userId = useSelector(state => state.user.id);

//   useEffect(() => {
//     // Get categories
//     const fetchCategories = async () => {
//       try {
//         const categoriesData = await getCategories();
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     // Get Restaurants
//     const fetchRestaurants = async () => {
//       try {
//         const restaurantsData = await getRestaurants();
//         setRestaurants(restaurantsData);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error);
//       }
//     };

//     // Get user
//     const fetchUserProfileData = async () => {
//       try {
//         const userProfileData = await fetchUserProfile(userId);
//         setUserProfile(userProfileData.profile);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchCategories();
//     fetchRestaurants();
//     fetchUserProfileData();
//   }, [userId]);

//   // Filtering data
//   // const filteredRestaurants = restaurants.filter(restaurant =>
//   //   restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   // );

//   // Filtering by category and search query

//   const filteredRestaurants = restaurants.filter(
//     restaurant =>
//       restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       (selectedCategory === null || restaurant.categoryId === selectedCategory),
//   );
//   const sortedRestaurants = userProfile
//     ? [...restaurants].sort((a, b) => {
//         const distanceA = getDistanceFromLatLonInKm(
//           userProfile.latitude,
//           userProfile.longitude,
//           a.latitude,
//           a.longitude,
//         );
//         const distanceB = getDistanceFromLatLonInKm(
//           userProfile.latitude,
//           userProfile.longitude,
//           b.latitude,
//           b.longitude,
//         );
//         return distanceA - distanceB;
//       })
//     : [];

//   // Filtering distance sorted restaurant by category

//   const filteredSortedRestaurants = sortedRestaurants.filter(
//     restaurant =>
//       selectedCategory === null || restaurant.categoryId === selectedCategory,
//   );

//   return (
//     <Background>
//       <View className="flex-1">
//         <HomeHeader />
//         <ScrollView
//           stickyHeaderIndices={[0]}
//           showsVerticalScrollIndicator={true}>
//           <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
//           <Categories
//             categories={categories}
//             onCategorySelect={setSelectedCategory}
//           />
//           <Featured
//             name="Restaurants you might like"
//             featuredRestaurants={filteredRestaurants}
//           />
//           {userProfile && (
//             <Featured
//               name="Closest Restaurants"
//               featuredRestaurants={filteredSortedRestaurants}
//             />
//           )}
//         </ScrollView>
//       </View>
//     </Background>
//   );
// };

// import React, {useEffect, useState} from 'react';
// import {View, ScrollView, Alert} from 'react-native';
// import HomeHeader from '../components/HomeHeader';
// import Categories from '../components/Categories';
// import SearchBar from '../components/SearchBar';
// import Featured from '../components/Featured';
// import {getCategories} from '../services/categoryService';
// import {getRestaurants} from '../services/restaurantService';
// import Background from '../components/Background';
// import {useSelector} from 'react-redux';
// import {fetchUserProfile} from '../services/userService';
// import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';

// const HomeScreen = () => {
//   const [categories, setCategories] = useState([]);
//   const [restaurants, setRestaurants] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [userProfile, setUserProfile] = useState(null);

//   const userId = useSelector(state => state.user.id);

//   useEffect(() => {
//     // Get categories
//     const fetchCategories = async () => {
//       try {
//         const categoriesData = await getCategories();
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     // Get Restaurants
//     const fetchRestaurants = async () => {
//       try {
//         const restaurantsData = await getRestaurants();
//         setRestaurants(restaurantsData);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error);
//       }
//     };

//     // Get user
//     const fetchUserProfileData = async () => {
//       try {
//         const userProfileData = await fetchUserProfile(userId);
//         if (userProfileData.error) {
//           throw new Error(userProfileData.error);
//         }
//         if (
//           userProfileData.profile &&
//           userProfileData.profile.latitude &&
//           userProfileData.profile.longitude
//         ) {
//           setUserProfile(userProfileData.profile);
//         } else {
//           console.error('User profile data is incomplete.');
//         }
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchCategories();
//     fetchRestaurants();
//     fetchUserProfileData();
//   }, [userId]);

//   // Filtering data
//   const filteredRestaurants = restaurants.filter(
//     restaurant =>
//       restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       (selectedCategory === null || restaurant.categoryId === selectedCategory),
//   );

//   const sortedRestaurants = userProfile
//     ? [...restaurants].sort((a, b) => {
//         const distanceA = getDistanceFromLatLonInKm(
//           userProfile.latitude,
//           userProfile.longitude,
//           a.latitude,
//           a.longitude,
//         );
//         const distanceB = getDistanceFromLatLonInKm(
//           userProfile.latitude,
//           userProfile.longitude,
//           b.latitude,
//           b.longitude,
//         );
//         return distanceA - distanceB;
//       })
//     : [];

//   // Filtering distance sorted restaurant by category
//   const filteredSortedRestaurants = sortedRestaurants.filter(
//     restaurant =>
//       selectedCategory === null || restaurant.categoryId === selectedCategory,
//   );

//   return (
//     <Background>
//       <View className="flex-1">
//         <HomeHeader />
//         <ScrollView
//           stickyHeaderIndices={[0]}
//           showsVerticalScrollIndicator={true}>
//           <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
//           <Categories
//             categories={categories}
//             onCategorySelect={setSelectedCategory}
//           />
//           <Featured
//             name="Restaurants you might like"
//             featuredRestaurants={filteredRestaurants}
//             userLocation={userProfile}
//           />
//           {userProfile && (
//             <Featured
//               name="Closest Restaurants"
//               featuredRestaurants={filteredSortedRestaurants}
//               userLocation={userProfile}
//             />
//           )}
//         </ScrollView>
//       </View>
//     </Background>
//   );
// };

// export default HomeScreen;

import React, {useEffect, useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import HomeHeader from '../components/HomeHeader';
import Categories from '../components/Categories';
import SearchBar from '../components/SearchBar';
import Featured from '../components/Featured';
import {getCategories} from '../services/categoryService';
import {getRestaurants} from '../services/restaurantService';
import Background from '../components/Background';
import {useSelector} from 'react-redux';
import {fetchUserProfile} from '../services/userService';
import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState(null);

  const userId = useSelector(state => state.user.id);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchRestaurants = async () => {
      try {
        const restaurantsData = await getRestaurants();
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    const fetchUserProfileData = async () => {
      try {
        const userProfileData = await fetchUserProfile(userId);
        if (userProfileData.error) {
          throw new Error(userProfileData.error);
        }
        if (
          userProfileData.profile &&
          userProfileData.profile.latitude !== null &&
          userProfileData.profile.longitude !== null
        ) {
          setUserProfile(userProfileData.profile);
        } else {
          console.error('User profile data is incomplete.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchCategories();
    fetchRestaurants();
    fetchUserProfileData();
  }, [userId]);

  // Filtering data
  const filteredRestaurants = restaurants.filter(
    restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === null || restaurant.categoryId === selectedCategory),
  );

  // Adding null checks for latitude and longitude
  const sortedRestaurants = userProfile
    ? [...restaurants]
        .filter(
          restaurant =>
            restaurant.latitude !== null && restaurant.longitude !== null,
        )
        .sort((a, b) => {
          const distanceA = getDistanceFromLatLonInKm(
            userProfile.latitude,
            userProfile.longitude,
            a.latitude,
            a.longitude,
          );
          const distanceB = getDistanceFromLatLonInKm(
            userProfile.latitude,
            userProfile.longitude,
            b.latitude,
            b.longitude,
          );
          return distanceA - distanceB;
        })
    : [];

  const filteredSortedRestaurants = sortedRestaurants.filter(
    restaurant =>
      selectedCategory === null || restaurant.categoryId === selectedCategory,
  );

  return (
    <Background>
      <View className="flex-1">
        <HomeHeader />
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={true}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          <Categories
            categories={categories}
            onCategorySelect={setSelectedCategory}
          />
          <Featured
            name="Restaurants you might like"
            featuredRestaurants={filteredRestaurants}
            userLocation={userProfile}
          />
          {userProfile && (
            <Featured
              name="Closest Restaurants"
              featuredRestaurants={filteredSortedRestaurants}
              userLocation={userProfile}
            />
          )}
        </ScrollView>
      </View>
    </Background>
  );
};

export default HomeScreen;
