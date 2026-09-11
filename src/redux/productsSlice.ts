// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import productsData from "../assets/supermarketassetmap.json";

// type Product = {
//   id: string;
//   name: string;
//   brand: string;
//   variant: string;
//   size: string;
//   price: number;
//   currency: string;
//   availability: "in_stock" | "low_stock" | "out_of_stock";
//   image: string;
// };

// type ProductsState = {
//   items: Product[];
//   searchTerm: string;
// };

// const products: Product[] = [];

//   const collectProducts = (data: unknown) => {
//   if (typeof data !== "object" || data === null) {
//     return;
//   }

//   if ("products" in data) {
//     const productsArray = (data as { products?: unknown }).products;

//     if (Array.isArray(productsArray)) {
//       products.push(...(productsArray as Product[]));
//     }
//   }

//   Object.values(data).forEach((value) => {
//     if (typeof value === "object" && value !== null) {
//       collectProducts(value);
//     }
//   });
// };

// collectProducts(productsData);

// console.log("Total products:", products.length);
// console.log(products);
// const initialState: ProductsState = {
//   items: products,
//   searchTerm: "", 
// };

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     setSearchTerm: (state, action: PayloadAction<string>) => {
//   state.searchTerm = action.payload;
// },
//   },
// });
// export const { setSearchTerm } = productsSlice.actions;
// export default productsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsData from "../assets/supermarketassetmap.json";

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

type ProductsState = {
  items: Product[];
  searchTerm: string;
};

const productMap = new Map<string, Product>();

const collectProducts = (data: unknown) => {
  if (typeof data !== "object" || data === null) {
    return;
  }

  if ("products" in data) {
    const productsArray = (data as { products?: unknown }).products;

    if (Array.isArray(productsArray)) {
      (productsArray as Product[]).forEach((product) => {
        productMap.set(product.id, product);
      });
    }
  }

  Object.values(data).forEach((value) => {
    if (typeof value === "object" && value !== null) {
      collectProducts(value);
    }
  });
};

collectProducts(productsData);

const products = Array.from(productMap.values());

console.log("Total unique products:", products.length);
console.log(products);

const initialState: ProductsState = {
  items: products,
  searchTerm: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = productsSlice.actions;

export default productsSlice.reducer;