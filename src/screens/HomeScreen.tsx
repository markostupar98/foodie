import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import HomeHeader from '../components/HomeHeader';
import Categories from '../components/Categories';
import SearchBar from '../components/SearchBar';
import Featured from '../components/Featured';
import {getCategories} from '../services/categoryService';
import {getRestaurants} from '../services/restaurantService';
import Background from '../components/Background';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

    fetchCategories();
    fetchRestaurants();
  }, []);

  // Filtering data
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
        </ScrollView>
      </View>
    </Background>
  );
};

export default HomeScreen;
