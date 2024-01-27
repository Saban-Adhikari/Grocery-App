import { createReducer } from "@reduxjs/toolkit";

export const extraReducer = createReducer({}, (builder) => {
  builder
    .addCase("updatePasswordRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("updateProfile", (state) => {
      state.loadingState = true;
    })
    .addCase("placeOrderRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("processOrderRequest", (state, action) => {
      state.loadingState = true;
    })
    .addCase("addCategoryRequest", (state, action) => {
      state.loadingState = true;
    })
    .addCase("deleteCategoryRequest", (state, action) => {
      state.loadingState = true;
    })
    .addCase("addProductRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("updateProductRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("updateProductImageRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("deleteProductImageRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("deleteProductRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("forgotPasswordRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("resetPasswordRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("updatePasswordSuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("placeOrderSuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("processOrderSuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("addCategorySuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("deleteCategorySuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("addProductSuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("updateProductSuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("deleteProductImageSuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("forgotPasswordSuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("resetPasswordSuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("updateProductImageSuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("updateProfileSuccess", (state, action) => {
      state.loadingState = false;
      state.message = action.payload;
    })
    .addCase("updatePasswordFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("updateProfileFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("placeOrderFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("processOrderFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("addCategoryFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("deleteCategoryFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("addProductFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("updateProductFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("updateProductImageFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("deleteProductImageFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("deleteProductFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("forgotPasswordFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    })
    .addCase("resetPasswordFail", (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    });
  builder.addCase("clearError", (state) => {
    state.error = null;
  });
  builder.addCase("clearMessaage", (state) => {
    state.message = null;
  });
});
