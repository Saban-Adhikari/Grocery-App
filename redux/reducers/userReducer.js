import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({}, (builder) => {
  builder
    .addCase("loginRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("loadUserRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("logoutRequest", (state) => {
      state.loadingState = true;
    })
    .addCase("signupRequest", (state) => {
      state.loadingState = true;
    });
  builder
    .addCase("loginSuccess", (state, action) => {
      state.loadingState = false;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    })
    .addCase("loadUserSuccess", (state, action) => {
      state.loadingState = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase("logoutSuccess", (state, action) => {
      state.loadingState = false;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.user = null;
    })
    .addCase("signupSuccess", (state, action) => {
      state.loadingState = false;
      state.isAuthenticated = true;
      state.message = action.payload;
    });
  builder
    .addCase("loginFail", (state, action) => {
      state.loadingState = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase("loadUserFail", (state, action) => {
      state.loadingState = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase("logoutFail", (state, action) => {
      state.loadingState = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    })
    .addCase("signupFail", (state, action) => {
      state.loadingState = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    });
  builder.addCase("clearError", (state, action) => {
    state.error = null;
  });
  builder.addCase("clearMessaage", (state, action) => {
    state.message = null;
  });
});
