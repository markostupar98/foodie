import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './slice/cartSlice';
import userSlice from './slice/userSlice';
import driverSlice from './slice/driverSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    driver: driverSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
