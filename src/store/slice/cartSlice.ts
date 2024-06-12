// store/slice/cartSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
    },
    updateItemQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            item => item.id !== action.payload.id,
          );
        }
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const {addItem, updateItemQuantity, removeItem} = cartSlice.actions;
export default cartSlice.reducer;
