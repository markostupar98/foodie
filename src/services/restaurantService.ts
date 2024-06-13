// services/restaurantService.js
import axios from 'axios';

export const getRestaurants = async () => {
  try {
    const response = await axios.get('http://10.0.2.2:3000/api/restaurants');
    const data = response.data;

    // Map the data if needed or use it directly
    return data.map(restaurant => ({
      ...restaurant,
      categoryName: restaurant.category.name, // Adjust based on actual data structure
    }));
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
    return [];
  }
};

// services/restaurantService.js
// Fetch basic details of a restaurant by ID
export const fetchRestaurantDetailsBasic = async restaurantId => {
  try {
    const response = await axios.get(
      `http://192.168.1.224:3000/api/restaurants/${restaurantId}`,
    );
    if (!response.data) {
      return {restaurant: null, dishes: [], error: 'Restaurant not found'};
    }
    return {
      restaurant: response.data,
      dishes: response.data.dishes || [],
      error: null,
    };
  } catch (error) {
    console.error('Error fetching basic restaurant details:', error);
    return {restaurant: null, dishes: [], error: error.message};
  }
};

// Fetch complete details of a restaurant by ID including coordinates and address

export const fetchRestaurantDetailsComplete = async restaurantId => {
  try {
    const response = await axios.get(
      `http://192.168.1.224:3000/api/restaurants/${restaurantId}/complete`,
    );
    if (!response.data) {
      return {restaurant: null, dishes: [], error: 'Restaurant not found'};
    }
    return {
      restaurant: response.data,
      dishes: response.data.dishes || [],
      error: null,
    };
  } catch (error) {
    console.error('Error fetching complete restaurant details:', error.message);
    return {restaurant: null, dishes: [], error: error.message};
  }
};
