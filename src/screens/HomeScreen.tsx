import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
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
  const [userProfile, setUserProfile] = useState(null);

  const userId = useSelector(state => state.user.id);

  useEffect(() => {
    // Get categories
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    // Get Restaurants
    const fetchRestaurants = async () => {
      try {
        const restaurantsData = await getRestaurants();
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    // Get user
    const fetchUserProfileData = async () => {
      try {
        const userProfileData = await fetchUserProfile(userId);
        setUserProfile(userProfileData.profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchCategories();
    fetchRestaurants();
    fetchUserProfileData();
  }, [userId]);

  // Filtering data
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedRestaurants = userProfile
    ? [...restaurants].sort((a, b) => {
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

  return (
    <Background>
      <View className="flex-1">
        <HomeHeader />
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={true}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          <Categories categories={categories} />
          <Featured
            name="Restaurants you might like"
            featuredRestaurants={filteredRestaurants}
          />
          {userProfile && (
            <Featured
              name="Closest Restaurants"
              featuredRestaurants={sortedRestaurants}
            />
          )}
        </ScrollView>
      </View>
    </Background>
  );
};

export default HomeScreen;
