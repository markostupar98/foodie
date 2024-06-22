import axios from 'axios';
import {BASE_URL} from '../lib/api';

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
