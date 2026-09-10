import React from "react";

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

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group">
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <p className="text-sm ">{product.brand}</p>

        <h3 className="font-medium mt-1">
          {product.name}
        </h3>

        <p className="text-sm  mt-1">
          {product.variant} · {product.size}
        </p>

        <p className="font-semibold  mt-2">
          ₦{product.price.toLocaleString()}
        </p>

        {product.availability === "low_stock" && (
          <p className="text-xs text-orange-600 mt-1">Low stock</p>
        )}

        {product.availability === "out_of_stock" && (
          <p className="text-xs text-red-600 mt-1">Out of stock</p>
        )}

        {product.availability === "in_stock" && (
          <p className="text-xs text-green-600 mt-1">In stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;