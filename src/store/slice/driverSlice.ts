import {createSlice} from '@reduxjs/toolkit';

export const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    id: null,
    token: null,
    isLoggedIn: false,
  },
  reducers: {
    setDriver: (state, action) => {
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
