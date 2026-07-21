import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import OrderPlace from "../OrderPlace/OrderPlace";
import { useStore } from "../../context/StoreContext";
import { useToast } from "../Toast/ToastContext";

const OrderSummary = () => {
  const { state, dispatch } = useStore();
  const { showToast } = useToast();
  const cart = state.cart;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingFee = 50;
  const orderTotal = subtotal + shippingFee;
  const [showOrderPlace, setShowOrderPlace] = useState(false);
  const onClose = () => dispatch({ type: "SET_PANEL", payload: null });

  return (
    <>
      <section className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60">
        <div className="bg-[var(--bg-primary)] w-[90vw] sm:w-full max-w-[560px] p-[24px] sm:p-[40px] border border-[var(--border-color)] shadow-2xl z-[9999] fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors text-[20px] cursor-pointer bg-transparent border-none"
          >
            <HiX />
          </button>

          <h2 className="text-[16px] text-[var(--text-primary)] font-bold mb-8 text-center uppercase tracking-widest border-b border-[var(--border-color)] pb-4">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-[40vh] overflow-y-auto scroll pr-2">
            {cart.length === 0 ? (
              <p className="text-center text-[var(--text-secondary)] text-[13px] uppercase tracking-[0.1em]">
                No items in cart
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-[var(--border-color)] pb-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-[48px] h-[48px] flex-shrink-0 bg-[var(--bg-secondary)] border border-[var(--border-color)] relative overflow-hidden flex items-center justify-center">
                      {item.thumbnail || item.image ? (
                        <img
                          src={item.thumbnail || item.image}
                          alt={item.title || item.name}
                          className="w-full h-full object-cover mix-blend-multiply"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : null}
                    </div>
                    <span className="text-[var(--text-primary)] text-[13px] font-semibold uppercase tracking-[0.1em] leading-tight">
                      {item.title || item.name}{" "}
                      <span className="text-[var(--text-secondary)] text-[12px] ml-1">
                        x{item.quantity}
                      </span>
                    </span>
                  </div>
                  <span className="text-[var(--text-primary)] text-[14px] font-bold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex justify-between text-[13px]">
              <span className="text-[var(--text-primary)] uppercase tracking-[0.1em] font-bold">
                SUBTOTAL
              </span>
              <span className="text-[var(--text-primary)] font-bold">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-[13px]">
              <span className="text-[var(--text-secondary)] uppercase tracking-[0.1em]">
                SHIPPING & HANDLING
              </span>
              <span className="text-[var(--text-primary)] font-bold">
                ₹{shippingFee.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between pt-4 mt-2 border-t border-[var(--border-color)]">
              <span className="text-[var(--text-primary)] font-bold text-[14px] uppercase tracking-[0.1em]">
                ORDER TOTAL
              </span>
              <span className="text-[var(--text-primary)] font-bold text-[16px]">
                ₹{orderTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex mt-8 gap-x-4">
            <button
              onClick={onClose}
              className="border border-[var(--text-primary)] bg-[var(--bg-primary)] flex-1 cursor-pointer py-[16px] text-[var(--text-primary)] font-bold uppercase tracking-[0.1em] text-[12px] hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] transition-all duration-300 rounded-none"
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                setShowOrderPlace(true);
                showToast("Order placed successfully!", "success");
              }}
              className="bg-[var(--btn-bg)] flex-1 py-[16px] text-[var(--btn-text)] font-bold uppercase tracking-[0.1em] text-[12px] cursor-pointer hover:bg-[var(--btn-hover)] transition-all duration-300 rounded-none"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </section>

      {showOrderPlace && (
        <OrderPlace
          subtotal={orderTotal}
          onClose={() => {
            setShowOrderPlace(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default OrderSummary;
