import { createSlice} from "@reduxjs/toolkit";
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
};

const products: Product[] = [];

  const collectProducts = (data: unknown) => {
  if (typeof data !== "object" || data === null) {
    return;
  }

  if ("products" in data) {
    const productsArray = (data as { products?: unknown }).products;

    if (Array.isArray(productsArray)) {
      products.push(...(productsArray as Product[]));
    }
  }

  Object.values(data).forEach((value) => {
    if (typeof value === "object" && value !== null) {
      collectProducts(value);
    }
  });
};

collectProducts(productsData);

console.log("Total products:", products.length);
console.log(products);
const initialState: ProductsState = {
  items: products,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;