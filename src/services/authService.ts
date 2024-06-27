import axios from 'axios';
import {Driver} from '../types/types';
import {BASE_URL} from '../lib/api';

interface SignUpDriverResponse {
  driverId: number | null;
  error: string | null;
}

interface SignInDriverResponse {
  token: string | null;
  driverId: number | null;
  error: string | null;
}

interface SignInUserResponse {
  token: string | null;
  userId: number | null;
  error: string | null;
}

interface SignUpUserResponse {
  success: boolean;
  message: string;
}

export const signupDriver = async (
  driverData: Partial<Driver>,
): Promise<SignUpDriverResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/signup/driver`,
      driverData,
    );
    return {driverId: response.data.driverId, error: null};
  } catch (error: any) {
    console.error('Error signing up driver:', error);
    return {driverId: null, error: error.message};
  }
};

// export const signinDriver = async (
//   email: string,
//   password: string,
// ): Promise<SignInDriverResponse> => {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/auth/signin/driver`, {
//       email,
//       password,
//     });
//     return {
//       token: response.data.token,
//       driverId: response.data.driverId,
//       error: null,
//     };
//   } catch (error: any) {
//     console.error('Error signing in driver:', error);
//     return {token: null, driverId: null, error: error.message};
//   }
// };
export const signinDriver = async (
  email: string,
  password: string,
): Promise<SignInDriverResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signin/driver`, {
      email,
      password,
    });
    return {
      token: response.data.token,
      driverId: response.data.driverId,
      error: null,
    };
  } catch (error: any) {
    console.error('Error signing in driver:', error);
    return {token: null, driverId: null, error: error.message};
  }
};

// export const signInUser = async (
//   email: string,
//   password: string,
// ): Promise<SignInUserResponse> => {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/auth/signin`, {
//       email,
//       password,
//     });
//     if (response.data) {
//       return {
//         token: response.data.token,
//         userId: response.data.userId,
//         error: null,
//       };
//     } else {
//       return {token: null, userId: null, error: 'Invalid credentials'};
//     }
//   } catch (error: any) {
//     console.error('Error signing in user:', error);
//     return {token: null, userId: null, error: error.message};
//   }
// };
export const signInUser = async (
  email: string,
  password: string,
): Promise<SignInUserResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signin`, {
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
  } catch (error: any) {
    console.error('Error signing in user:', error);
    return {token: null, userId: null, error: error.message};
  }
};

export const signUpUser = async (
  email: string,
  password: string,
  fullName: string,
  username: string,
  address: string,
): Promise<SignUpUserResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
      email,
      password,
      fullName,
      username,
      address,
      role: 'user',
    });

    if (response.status === 201) {
      return {
        success: true,
        message: 'User created successfully',
        userId: response.data.userId,
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Something went wrong',
      };
    }
  } catch (error: any) {
    console.error('Error signing up user:', error);
    return {
      success: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};
