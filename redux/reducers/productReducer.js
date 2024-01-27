import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  {
    products: [],
    product: {},
  },
  (builder) => {
    builder
      .addCase("getAllProductsRequest", (state) => {
        state.loadingState = true;
      })
      .addCase("getAdminProductsRequest", (state) => {
        state.loadingState = true;
      })
      .addCase("getProductDetailsRequest", (state) => {
        state.loadingState = true;
      })
      .addCase("getAllProductsSuccess", (state, action) => {
        state.loadingState = false;
        state.products = action.payload;
      })
      .addCase("getAdminProductsSuccess", (state, action) => {
        state.loadingState = false;
        state.products = action.payload.products;
        state.availableStock = action.payload.availableStock;
        state.notInStock = action.payload.notInStock;
      })
      .addCase("getProductDetailsSuccess", (state, action) => {
        state.loadingState = false;
        state.product = action.payload;
      })
      .addCase("getAllProductsFail", (state, action) => {
        state.loadingState = false;
        state.error = action.payload;
      })
      .addCase("getAdminProductsFail", (state, action) => {
        state.loadingState = false;
        state.error = action.payload;
      })
      .addCase("getProductDetailsFail", (state, action) => {
        state.loadingState = false;
        state.error = action.payload;
      });
    builder.addCase("clearError", (state, action) => {
      state.error = null;
    });
    builder.addCase("clearMessaage", (state, action) => {
      state.message = null;
    });
  }
);
