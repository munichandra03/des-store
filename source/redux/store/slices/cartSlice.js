import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  total: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.total += 1;
    },
    removeFromCart: (state) => {
        state.total -= 1
    },
    incrementByNumber: (state, action) => {
      state.total = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, incrementByNumber } = cartSlice.actions;

export default cartSlice.reducer;
