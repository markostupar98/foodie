import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: null,
  token: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{id: string; token: string}>) => {
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
