import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../store/slice/cartSlice';
import userReducer from './slice/userSlice';
import driverReducer from './slice/driverSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    driver: driverReducer,
  },
});
