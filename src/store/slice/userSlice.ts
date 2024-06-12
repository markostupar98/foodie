import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    token: null,
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    clearUser: state => {
      state.id = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
