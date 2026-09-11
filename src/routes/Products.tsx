import React from "react";
import productsData from "../assets/supermarketassetmap.json";
import Navbar from "../components/Navbar";
import ProductCard from "../products/ProductCard";

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

const Products: React.FC = () => {
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
  console.log(products);



  return (
   <div className="min-h-screen transition-colors duration-1000 overflow-hidden bg-red-800">
      <Navbar />

      <main className="container mx-auto px-4 md:px-8 lg:px-16 py-12 ">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          All Products
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 text-white">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              // handleAddToCart={handleAddToCart}
              // handleRemoveFromCart={handleRemoveFromCart}
              // cartItems={cartItems}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;