// import React from "react";
// import { ShoppingBag } from "lucide-react";
// import { useCart } from "../context/CartContext";

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

// type ProductCardProps = {
//   product: Product;
// };

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const { addToCart} = useCart();

//   const isOutOfStock = product.availability === "out_of_stock";

//   return (
//     <div className="group">
//       <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
//         />
//       </div>

//       <div className="mt-4">
//         <p className="text-sm ">{product.brand}</p>

//         <h3 className="font-medium  mt-1">{product.name}</h3>

//         <p className="text-sm  mt-1">
//           {product.variant} · {product.size}
//         </p>

//         <div className="flex items-center justify-between gap-3 mt-3">
//           <p className="font-semibold">
//             ₦{product.price.toLocaleString()}
//           </p>
//              {product.availability === "low_stock" && (
//           <p className="text-s text-orange-600 mt-2">Low stock</p>
//         )}

//         {product.availability === "in_stock" && (
//           <p className="text-s text-green-600 mt-2">In stock</p>
//         )}
//         </div>
// <div className="flex items-center justify-between gap-3 mt-3">
//    <button
//             onClick={() => addToCart(product)}
//             disabled={isOutOfStock}
//             className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-red-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             <ShoppingBag size={16} />
//             {isOutOfStock ? "Out of stock" : "Add to cart"}
//           </button>

//           </div>
        
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


import React from "react";
import { ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import type { AppDispatch } from "../redux/store";

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
  const dispatch = useDispatch<AppDispatch>();

  const isOutOfStock = product.availability === "out_of_stock";

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
        <p className="text-sm">{product.brand}</p>

        <h3 className="font-medium mt-1">{product.name}</h3>

        <p className="text-sm mt-1">
          {product.variant} · {product.size}
        </p>

        <div className="flex items-center justify-between gap-3 mt-3">
          <p className="font-semibold">
            ₦{product.price.toLocaleString()}
          </p>

          {product.availability === "low_stock" && (
            <p className="text-sm text-orange-600 mt-2">Low stock</p>
          )}

          {product.availability === "in_stock" && (
            <p className="text-sm text-green-600 mt-2">In stock</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 mt-3">
          <button
            onClick={() => dispatch(addToCart(product))}
            disabled={isOutOfStock}
            className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-red-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={16} />
            {isOutOfStock ? "Out of stock" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

