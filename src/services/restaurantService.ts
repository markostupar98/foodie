// services/restaurantService.js
import axios from 'axios';
import {BASE_URL} from '../lib/api';

export const getRestaurants = async () => {
  try {
    const response = await axios.get(`http://${BASE_URL}/api/restaurants`);
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
export const fetchRestaurantDetails = async (
  restaurantId,
  includeCompleteDetails = false,
) => {
  try {
    const endpoint = includeCompleteDetails
      ? `${BASE_URL}/api/restaurants/${restaurantId}/complete`
      : `${BASE_URL}/api/restaurants/${restaurantId}`;

    const response = await axios.get(endpoint);
    if (!response.data) {
      return {restaurant: null, dishes: [], error: 'Restaurant not found'};
    }
    return {
      restaurant: response.data,
      dishes: response.data.dishes || [],
      error: null,
    };
  } catch (error) {
    console.error('Error fetching restaurant details:', error.message);
    return {restaurant: null, dishes: [], error: error.message};
  }
};
