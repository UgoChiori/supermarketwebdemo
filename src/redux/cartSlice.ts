import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: string;
  name: string;
  brand: string;
  variant: string;
  size: string;
  price: number;
  currency: string;
  availability: "in_stock" | "low_stock" | "out_of_stock";
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  item: CartItem[];
};

const initialState: CartState = {
  item: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      const existingItem = state.item.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.item.push({
          ...product,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.item.find((item) => item.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.item.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
      }
      state.item = state.item.filter((item) => item.quantity > 0);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
