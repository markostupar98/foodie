import axios from 'axios';
import {BASE_URL} from '../lib/api';

// Fetch user profile
export const fetchDriverProfile = async driverId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/drivers/${driverId}/profile`,
    );
    return {profile: response.data, error: null};
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {profile: null, error: error.message};
  }
};

// Updating user profile
export const updateDriverProfile = async (driverId, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/drivers/${driverId}/profile`,
      data,
    );
    return {profile: response.data, error: null};
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {profile: null, error: error.message};
  }
};
