// import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItem: (state, action: PayloadAction<CartItem>) => {
//       const item = state.items.find(item => item.id === action.payload.id);
//       if (item) {
//         item.quantity += action.payload.quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//     },
//     updateItemQuantity: (
//       state,
//       action: PayloadAction<{id: number; quantity: number}>,
//     ) => {
//       const item = state.items.find(item => item.id === action.payload.id);
//       if (item) {
//         item.quantity = action.payload.quantity;
//         if (item.quantity <= 0) {
//           state.items = state.items.filter(
//             item => item.id !== action.payload.id,
//           );
//         }
//       }
//     },
//     removeItem: (state, action: PayloadAction<{id: number}>) => {
//       state.items = state.items.filter(item => item.id !== action.payload.id);
//     },
//   },
// });

// export const {addItem, updateItemQuantity, removeItem} = cartSlice.actions;
// export default cartSlice.reducer;
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{id: number; quantity: number}>,
    ) => {
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
    removeItem: (state, action: PayloadAction<{id: number}>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const {addItem, updateItemQuantity, removeItem} = cartSlice.actions;
export default cartSlice.reducer;
