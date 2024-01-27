import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { extraReducer } from "./reducers/extraReducer";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    extra: extraReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export const backendServer = "https://groceryapp-backend.onrender.com/api/v1";
