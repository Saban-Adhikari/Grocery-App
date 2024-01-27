import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {
    cartItems: [],
  },
  (builder) => {
    builder
      .addCase("addToCart", (state, action) => {
        const item = action.payload;
        const doesExist = state.cartItems.find(
          (i) => i.product === item.product
        );
        if (doesExist) {
          state.cartItems = state.cartItems.filter((i) =>
            i.product === doesExist.product ? item : i
          );
          for (let i = 0; i < state.cartItems.length; i++) {
            if (state.cartItems[i].product === doesExist.product)
              state.cartItems[i] = item;
          }
        } else state.cartItems.push(item);
      })
      .addCase("removeFromCart", (state, action) => {
        const id = action.payload;
        state.cartItems = state.cartItems.filter((i) => i.product !== id);
      })
      .addCase("clearFromCart", (state) => {
        state.cartItems = [];
      });
  }
);
