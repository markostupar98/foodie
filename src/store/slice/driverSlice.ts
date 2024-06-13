import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DriverState {
  id: string | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: DriverState = {
  id: null,
  token: null,
  isLoggedIn: false,
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setDriver: (state, action: PayloadAction<{id: string; token: string}>) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    clearDriver: state => {
      state.id = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const {setDriver, clearDriver} = driverSlice.actions;

export default driverSlice.reducer;
