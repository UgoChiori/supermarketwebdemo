import React, { useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
// import { useCart } from "../context/CartContext";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";  
import CartDrawer from "../context/CartDrawer";

const Navbar: React.FC = () => {
  // const { cartCount } = useCart();
  const cartItems = useSelector((state: RootState) => state.cart.item);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Branches", path: "/branches" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="relative z-50" data-aos="fade-down" data-aos-delay="500">
      <div className="container mx-auto px-4 md:px:8 lg:px-16 py-6">
        <div className="flex items-center justify-between">
          <div className="text-white text-2xl font-bold uppercase tracking-tight">
            Dairy
            <span className="text-xs align-top ml-0.5">@</span>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="flex gap-8 lg:gap-12 text-white">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setActiveLink(link.label)}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative font-medium transition-opacity hover:opacity-70
                    ${
                      activeLink === link.label ? "opacity-100" : "opacity-80"
                    }`}
                >
                  {link.label}
                  {(hoveredLink === link.label ||
                    activeLink === link.label) && (
                    <span
                      className="absolute bottom-2 left-0 right-0 h-0.5
                   rounded-full animate-fade-in"
                    ></span>
                  )}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 text-white">
            <button className="hover:opacity-70 transition-opacity ">
              <Search size={20} />
            </button>
            <button
              className="hover:opacity-70 transition-opacity relative"
              onClick={() => setIsCartDrawerOpen(true)}
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-white text-gray-900 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden hover:opacity-70 transition-opacity"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 border-t border-white/20 pt-4 text-white">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => {
                    setActiveLink(link.label);
                    setIsMenuOpen(false);
                  }}
                  className={`py-2 relative transition-opacity hover:opacity-70 ${
                    activeLink === link.label ? "opacity-100" : "opacity-80"
                  }`}
                  // className="text-white font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      {isCartDrawerOpen && (
        <CartDrawer onClose={() => setIsCartDrawerOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
