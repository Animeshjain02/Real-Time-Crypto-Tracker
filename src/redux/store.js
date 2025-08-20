import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});
