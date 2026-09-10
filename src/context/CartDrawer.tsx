import React from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

type CartDrawerProps = {
  onClose: () => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({ onClose }) => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Shopping Cart
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {cartItems.length === 0
                ? "Your cart is empty"
                : `${cartItems.length} ${
                    cartItems.length === 1 ? "item" : "items"
                  }`}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-500">
                Your cart is empty.
              </p>

              <button
                onClick={onClose}
                className="mt-4 bg-red-800 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-red-900 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-500">
                          {item.brand}
                        </p>

                        <h3 className="text-sm font-medium text-gray-900 mt-1">
                          {item.name}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.variant} · {item.size}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-800 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200 rounded-full">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-semibold text-sm text-gray-900">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span className="text-xl font-bold text-gray-900">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Delivery charges will be calculated at checkout.
            </p>

            <button
              className="w-full bg-red-800 text-white py-3.5 rounded-full font-medium hover:bg-red-900 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;