// services/categoryService.js
import axios from 'axios';

export const getCategories = async () => {
  try {
    const response = await axios.get('http://10.0.2.2:3000/api/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
