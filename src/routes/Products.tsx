// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState, AppDispatch } from "../redux/store";
// import Navbar from "../components/Navbar";
// import ProductCard from "../products/ProductCard";
// import { setSearchTerm } from "../redux/productsSlice";

// const Products: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const products = useSelector(
//     (state: RootState) => state.products.items
//   );

// const searchTerm = useSelector(
//   (state: RootState) => state.products.searchTerm
// )
//   console.log("Products from Redux:", products);

//   return (
//     <div className="min-h-screen transition-colors duration-1000 overflow-hidden bg-red-800">
//       <Navbar />

//       <main className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
//         <h1 className="text-3xl md:text-4xl font-bold text-white">
//           All Products
//         </h1>
// <div className="mt-6">
//   <input
//     type="text"
//     value={searchTerm}
//     onChange={(event) => dispatch(setSearchTerm(event.target.value))}
//     placeholder="Search products..."
//     className="w-full max-w-xl px-5 py-3 rounded-full bg-white text-gray-900 outline-none focus:ring-2 focus:ring-red-300"
//   />
// </div>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 text-white">
//           {products.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//             />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Products;


import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import Navbar from "../components/Navbar";
import ProductCard from "../products/ProductCard";
import { setSearchTerm } from "../redux/productsSlice";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(
    (state: RootState) => state.products.items
  );

  const searchTerm = useSelector(
    (state: RootState) => state.products.searchTerm
  );

// const filteredProducts = products.filter((product) => {
//   const search = searchTerm.toLowerCase().trim();

//   return product.name.toLowerCase().includes(search);
// });
const filteredProducts = products.filter((product) => {
  const search = searchTerm.toLowerCase().trim();

  const matches = product.name.toLowerCase().includes(search);

  if (search === "chicken") {
    console.log("SEARCH:", search);
    console.log("PRODUCT:", product.name);
    console.log("MATCH:", matches);
  }

  return matches;
});
  // console.log("Products from Redux:", products);

  return (
    <div className="min-h-screen transition-colors duration-1000 overflow-hidden bg-red-800">
      <Navbar />

      <main className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          All Products
        </h1>

        <div className="mt-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              dispatch(setSearchTerm(event.target.value))
            }
            placeholder="Search products..."
            className="w-full max-w-xl px-5 py-3 rounded-full bg-white text-gray-900 outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 text-white">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;