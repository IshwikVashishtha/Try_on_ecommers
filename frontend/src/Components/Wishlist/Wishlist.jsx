import React from "react";
import { HiX, HiOutlineHeart } from "react-icons/hi";
import { useStore } from "../../context/StoreContext";

const Wishlist = () => {
  const { state, dispatch } = useStore();
  const { activePanel, wishlist } = state;
  const closePanel = () => dispatch({ type: "SET_PANEL", payload: null });

  return (
    <>
      {/* Backdrop overlay */}
      {activePanel === "wishlist" && (
        <div
          className="fixed inset-0 bg-black/60 z-[9998] transition-opacity"
          onClick={closePanel}
        ></div>
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[9999] h-[100vh] w-full sm:w-[420px] bg-[var(--bg-primary)] border-l border-[var(--border-color)] flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto ${
          activePanel === "wishlist"
            ? "translate-y-0 sm:translate-x-0"
            : "translate-y-full sm:translate-y-0 sm:translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-[var(--border-color)]">
          <h3 className="font-bold text-[14px] text-[var(--text-primary)] uppercase tracking-[0.1em]">
            Your Wishlist
          </h3>
          <button
            onClick={closePanel}
            className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors text-[20px] cursor-pointer bg-transparent border-none"
          >
            <HiX />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto scroll">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 px-6">
              <HiOutlineHeart className="text-[48px] text-[var(--border-color)] stroke-[1.0]" />
              <p className="text-[var(--text-primary)] text-[18px] uppercase tracking-[0.1em] font-bold">
                YOUR WISHLIST IS EMPTY
              </p>
              <p className="text-[var(--text-secondary)] text-[15px] mb-4">
                Save items you love for later.
              </p>
              <button
                onClick={closePanel}
                className="bg-[var(--btn-bg)] text-[var(--btn-text)] px-8 py-[16px] rounded-none uppercase tracking-[0.1em] text-[13px] font-bold hover:bg-[var(--btn-hover)] transition-all duration-300"
              >
                EXPLORE PRODUCTS
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-[var(--bg-primary)] px-6 py-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                {/* Wishlist Image */}
                <div className="w-[72px] h-[72px] border border-[var(--border-color)] flex-shrink-0 bg-[var(--bg-secondary)] flex items-center justify-center relative overflow-hidden">
                  {item.thumbnail || item.image ? (
                    <img
                      src={item.thumbnail || item.image}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover mix-blend-multiply"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 bg-[var(--bg-secondary)] items-center justify-center"
                    style={{
                      display: item.thumbnail || item.image ? "none" : "flex",
                    }}
                  >
                    <HiOutlineHeart className="text-[var(--border-color)] text-[24px]" />
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-[var(--text-primary)] text-[13px] uppercase tracking-[0.1em] leading-[1.4]">
                      {item.title || item.name}
                    </h4>
                    <button
                      className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer text-[16px] ml-4 shrink-0"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_WISHLIST",
                          payload: item.id,
                        })
                      }
                      aria-label="Remove from wishlist"
                    >
                      <HiX />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[var(--text-primary)]">
                        ₹{item.price.toFixed(2)}
                      </span>
                      {item.oldPrice && (
                        <span className="text-[12px] text-[var(--text-secondary)] line-through">
                          ₹{item.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        dispatch({ type: "ADD_TO_CART", payload: item });
                        dispatch({
                          type: "REMOVE_FROM_WISHLIST",
                          payload: item.id,
                        });
                      }}
                      className="bg-[var(--btn-bg)] text-[var(--btn-text)] font-bold uppercase tracking-[0.1em] text-[12px] px-4 py-2 rounded-none cursor-pointer hover:bg-[var(--btn-hover)] transition-all duration-300"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Area */}
        {wishlist.length > 0 && (
          <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-primary)] flex flex-col">
            <button
              className="w-full border border-[var(--text-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] font-bold uppercase tracking-[0.1em] text-[13px] py-[16px] rounded-none cursor-pointer hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] transition-all duration-300"
              onClick={() => dispatch({ type: "CLEAR_WISHLIST" })}
            >
              CLEAR ALL
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
