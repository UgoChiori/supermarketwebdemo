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

  Object.values(productsData).forEach((category) => {
    Object.values(category).forEach((subcategory) => {
      if (
        typeof subcategory === "object" &&
        subcategory !== null &&
        "products" in subcategory
      ) {
        products.push(
          ...(subcategory.products as Product[])
        );
      }
    });
  });

  console.log(products);

  const handleAddToCart = (product: Product) => {
    // Implement the logic to add the product to the cart
    console.log("Adding to cart:", product);
  };
  
  const handleRemoveFromCart = (product: Product) => {
    // Implement the logic to remove the product from the cart
    console.log("Removing from cart:", product);
  };


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