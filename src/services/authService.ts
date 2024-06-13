import axios from 'axios';

export const signupDriver = async driverData => {
  try {
    const response = await axios.post(
      'http://10.0.2.2:3000/api/auth/signup/driver',
      driverData,
    );
    return {driverId: response.data.driverId, error: null};
  } catch (error) {
    console.error('Error signing up driver:', error);
    return {driverId: null, error: error.message};
  }
};

export const signinDriver = async (email, password) => {
  try {
    const response = await axios.post(
      'http://10.0.2.2:3000/api/auth/signin/driver',
      {email, password},
    );
    return {
      token: response.data.token,
      driverId: response.data.driverId,
      error: null,
    };
  } catch (error) {
    console.error('Error signing in driver:', error);
    return {token: null, driverId: null, error: error.message};
  }
};

export const signInUser = async (email, password) => {
  try {
    const response = await axios.post('http://10.0.2.2:3000/api/auth/signin', {
      email,
      password,
    });
    if (response.data) {
      return {
        token: response.data.token,
        userId: response.data.userId,
        error: null,
      };
    } else {
      return {token: null, userId: null, error: 'Invalid credentials'};
    }
  } catch (error) {
    console.error('Error signing in user:', error);
    return {token: null, userId: null, error: error.message};
  }
};
