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
import notifee, {AndroidImportance} from '@notifee/react-native';
import Categories from '../components/Categories';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import Featured from '../components/Featured';
import {fetchUserProfile, updateUserProfile} from '../services/userService';
import {getRestaurants} from '../services/restaurantService';
import {getCategories} from '../services/categoryService';
import {getDistanceFromLatLonInKm} from '../lib/deliveryFeeandTimeCalc';
import {BASE_URL} from '../lib/api';

// const HomeScreen = () => {
//   const [categories, setCategories] = useState([]);
//   const [restaurants, setRestaurants] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadingError, setLoadingError] = useState(false);

//   const userId = useSelector(state => state.user.id);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const categoriesData = await getCategories();
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//         Alert.alert('Error', 'Failed to fetch categories.');
//       }
//     };

//     const fetchRestaurants = async () => {
//       try {
//         const restaurantsData = await getRestaurants();
//         setRestaurants(restaurantsData);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error);
//         Alert.alert('Error', 'Failed to fetch restaurants.');
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
//           Alert.alert('Error', 'User profile data is incomplete.');
//         }
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//         Alert.alert('Error', 'Failed to fetch user profile.');
//       }
//     };

//     const requestLocationPermission = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           Geolocation.getCurrentPosition(
//             async position => {
//               const {latitude, longitude} = position.coords;
//               console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//               const {profile, error} = await updateUserProfile(userId, {
//                 latitude,
//                 longitude,
//               });
//               if (error) {
//                 console.error('Error updating user profile:', error);
//                 Alert.alert('Error', error.message);
//               } else {
//                 console.log('Profile updated successfully:', profile);
//                 setUserProfile(profile);
//                 Alert.alert('Success', 'Location updated successfully!');
//               }
//             },
//             error => {
//               console.error('Error getting location:', error);
//               Alert.alert('Error', 'Unable to get location');
//             },
//             {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//           );
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn('Error requesting location permission:', err);
//       }
//     };

//     const fetchData = async () => {
//       setLoading(true);
//       setLoadingError(false);
//       try {
//         await fetchCategories();
//         await fetchRestaurants();
//         await fetchUserProfileData();
//         await requestLocationPermission();
//       } catch (error) {
//         setLoadingError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
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

//   if (loading) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

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
    if (!userId) {
      console.log('User ID is not available yet.');
      return;
    }

    const registerFCMToken = async (userId, token) => {
      try {
        console.log('Registering FCM token for user:', userId);
        const response = await axios.post(
          `${BASE_URL}/api/notifications/register-token`,
          {
            userId,
            token,
          },
        );
        console.log('FCM token registered successfully.', response.data);
      } catch (error) {
        console.error(
          'Error registering FCM token:',
          error.response ? error.response.data : error.message,
        );
      }
    };

    const requestPermissionsAndRegisterToken = async () => {
      try {
        // Request permissions on Android
        const androidResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (androidResult === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted.');
        } else {
          console.error('Notification permission denied.');
        }

        // Request permissions on iOS
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
        } else {
          console.error('Notification permission denied on iOS.');
        }

        // Get the device token
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        registerFCMToken(userId, token); // Registruj token kada je userId dostupan

        // Listen for token refresh
        const unsubscribeFromTokenRefresh = messaging().onTokenRefresh(
          token => {
            console.log('FCM Token refreshed:', token);
            registerFCMToken(userId, token); // Registruj osvežen token kada je userId dostupan
          },
        );

        // Listen for messages
        const unsubscribeFromMessages = messaging().onMessage(
          async remoteMessage => {
            displayNotification(remoteMessage);
          },
        );

        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Message handled in the background!', remoteMessage);
          displayNotification(remoteMessage);
        });

        return () => {
          unsubscribeFromTokenRefresh();
          unsubscribeFromMessages();
        };
      } catch (error) {
        console.error(
          'Error requesting permissions or registering token:',
          error,
        );
      }
    };

    requestPermissionsAndRegisterToken();

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

  const displayNotification = async remoteMessage => {
    // Create a channel (required for Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    if (remoteMessage.notification) {
      await notifee
        .displayNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          android: {
            channelId: 'default',
            pressAction: {
              id: 'default',
            },
          },
        })
        .catch(error => {
          console.error('Error displaying notification:', error);
        });
    } else {
      console.error('Remote message notification payload is missing.');
    }
  };

  const filteredRestaurants = restaurants.filter(
    restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === null || restaurant.categoryId === selectedCategory),
  );

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
