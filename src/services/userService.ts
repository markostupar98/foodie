// services/userService.js
import axios from 'axios';

// Fetching user profile
export const fetchUserProfile = async userId => {
  try {
    const response = await axios.get(
      `http://10.0.2.2:3000/api/users/${userId}/profile`,
    );
    return {profile: response.data, error: null};
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return {profile: null, error: error.message};
  }
};

// Updating user profile
export const updateUserProfile = async (userId, data) => {
  try {
    const response = await axios.put(
      `http://10.0.2.2:3000/api/users/${userId}/profile`,
      data,
    );
    return {profile: response.data, error: null};
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return {profile: null, error: error.message};
  }
};
