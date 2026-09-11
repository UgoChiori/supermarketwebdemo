import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Routes, Route } from "react-router-dom";
import Products from "./routes/Products";
import Home from "./routes/Home";
import { CartProvider } from "./context/CartContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";


function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-out-cubic",
      offset: 100,
    });
  }, []);

  return (
    <Provider store={store}>
    <CartProvider>
    <div className="overflow-hidden ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
    </CartProvider>
    </Provider>
  );
}

export default App;
