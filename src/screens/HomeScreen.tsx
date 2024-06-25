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
//     const fetchCategories = async () => {
//       try {
//         const categoriesData = await getCategories();
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     const fetchRestaurants = async () => {
//       try {
//         const restaurantsData = await getRestaurants();
//         setRestaurants(restaurantsData);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error);
//       }
//     };

//     const fetchUserProfileData = async () => {
//       try {
//         const userProfileData = await fetchUserProfile(userId);
//         if (userProfileData.error) {
//           throw new Error(userProfileData.error);
//         }
//         if (
//           userProfileData.profile &&
//           userProfileData.profile.latitude !== null &&
//           userProfileData.profile.longitude !== null
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

//   // Adding null checks for latitude and longitude
//   const sortedRestaurants = userProfile
//     ? [...restaurants]
//         .filter(
//           restaurant =>
//             restaurant.latitude !== null && restaurant.longitude !== null,
//         )
//         .sort((a, b) => {
//           const distanceA = getDistanceFromLatLonInKm(
//             userProfile.latitude,
//             userProfile.longitude,
//             a.latitude,
//             a.longitude,
//           );
//           const distanceB = getDistanceFromLatLonInKm(
//             userProfile.latitude,
//             userProfile.longitude,
//             b.latitude,
//             b.longitude,
//           );
//           return distanceA - distanceB;
//         })
//     : [];

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
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';
import Button from '../components/Button';
import Background from '../components/Background';
import HomeHeader from '../components/HomeHeader';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import Featured from '../components/Featured';
import {fetchUserProfile, updateUserProfile} from '../services/userService';
import {getRestaurants} from '../services/restaurantService';
import {getCategories} from '../services/categoryService';
import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const userId = useSelector(state => state.user.id);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'Failed to fetch categories.');
      }
    };

    const fetchRestaurants = async () => {
      try {
        const restaurantsData = await getRestaurants();
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        Alert.alert('Error', 'Failed to fetch restaurants.');
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
          Alert.alert('Error', 'User profile data is incomplete.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert('Error', 'Failed to fetch user profile.');
      }
    };

    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            async position => {
              const {latitude, longitude} = position.coords;
              console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
              const {profile, error} = await updateUserProfile(userId, {
                latitude,
                longitude,
              });
              if (error) {
                console.error('Error updating user profile:', error);
                Alert.alert('Error', error.message);
              } else {
                console.log('Profile updated successfully:', profile);
                setUserProfile(profile);
                Alert.alert('Success', 'Location updated successfully!');
              }
            },
            error => {
              console.error('Error getting location:', error);
              Alert.alert('Error', 'Unable to get location');
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn('Error requesting location permission:', err);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      setLoadingError(false);
      try {
        await fetchCategories();
        await fetchRestaurants();
        await fetchUserProfileData();
        await requestLocationPermission();
      } catch (error) {
        setLoadingError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
