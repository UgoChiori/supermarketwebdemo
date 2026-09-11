import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";

const savedCart = localStorage.getItem("cart");

const preloadedState = {
  cart: {
    item: savedCart ? JSON.parse(savedCart) : [],
  },
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart.item));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;