
import React from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

type CartDrawerProps = {
  onClose: () => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(
    (state: RootState) => state.cart.item
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="absolute top-0 right-0 w-full sm:w-[420px] h-full bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Your Cart
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
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="min-h-[500px] max-h-[calc(100vh-250px)] overflow-y-auto px-5 py-5 bg-gray-50">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                <ShoppingBag size={26} className="text-gray-400" />
              </div>

              <h3 className="text-lg font-medium text-gray-900">
                Your cart is empty
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Add some goodies to get started.
              </p>

              <button
                onClick={onClose}
                className="mt-5 bg-red-800 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-red-900 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {item.brand}
                          </p>

                          <h3 className="text-sm font-semibold text-gray-900 mt-1 leading-snug">
                            {item.name}
                          </h3>

                          <p className="text-xs text-gray-500 mt-1">
                            {item.variant} · {item.size}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            dispatch(removeFromCart(item.id))
                          }
                          className="text-gray-400 hover:text-red-800 transition-colors flex-shrink-0"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center bg-gray-100 rounded-full p-1">
                          <button
                            onClick={() =>
                              dispatch(decreaseQuantity(item.id))
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="text-sm font-semibold w-8 text-center text-gray-900">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              dispatch(increaseQuantity(item.id))
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="font-bold text-gray-900">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 bg-white px-6 py-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">
                Subtotal
              </span>

              <span className="text-xl font-bold text-gray-900">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-gray-400 mb-4">
              Delivery charges will be calculated at checkout.
            </p>

            <button className="w-full bg-red-800 text-white py-3.5 rounded-full font-semibold hover:bg-red-900 transition-all hover:shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;

