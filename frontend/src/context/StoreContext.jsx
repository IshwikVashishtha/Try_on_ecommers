import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useToast } from "../Components/Toast/ToastContext";

const StoreContext = createContext();

const STORAGE_KEYS = {
  cart: "fs_cart",
  wishlist: "fs_wishlist",
};

const initialState = {
  cart: [],
  wishlist: [],
  user: null,
  activePanel: null,
  searchQuery: "",
  cartAddedPulse: false,
};

const normalizeCartItem = (item) => ({
  id: item.id,
  title: item.title,
  price: Number(item.price) || 0,
  image: item.image || item.thumbnail || "",
  category: item.category || "clothing",
  quantity: Math.max(1, Number(item.quantity) || 1),
  ...(item.discountPercentage
    ? { discountPercentage: item.discountPercentage }
    : {}),
  ...(item.rating ? { rating: item.rating } : {}),
});

const parseStored = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to parse persisted store state", error);
    return [];
  }
};

const getInitialState = () => ({
  ...initialState,
  cart: parseStored(STORAGE_KEYS.cart),
  wishlist: parseStored(STORAGE_KEYS.wishlist),
});

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const incoming = normalizeCartItem(action.payload || {});
      const existing = state.cart.find((item) => item.id === incoming.id);
      if (existing) {
        return {
          ...state,
          cartAddedPulse: true,
          cart: state.cart.map((item) =>
            item.id === incoming.id
              ? { ...item, quantity: item.quantity + incoming.quantity }
              : item,
          ),
        };
      }
      return {
        ...state,
        cartAddedPulse: true,
        cart: [...state.cart, incoming],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: Math.max(0, Number(action.payload.quantity) || 0),
                }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "ADD_TO_WISHLIST": {
      const candidate = normalizeCartItem({
        ...(action.payload || {}),
        quantity: 1,
      });
      if (state.wishlist.some((item) => item.id === candidate.id)) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, candidate] };
    }
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_WISHLIST":
      return { ...state, wishlist: [] };
    case "TOGGLE_WISHLIST": {
      const exists = state.wishlist.some(
        (item) => item.id === action.payload.id,
      );
      if (exists) {
        return {
          ...state,
          wishlist: state.wishlist.filter(
            (item) => item.id !== action.payload.id,
          ),
        };
      }
      const candidate = normalizeCartItem({
        ...(action.payload || {}),
        quantity: 1,
      });
      return { ...state, wishlist: [...state.wishlist, candidate] };
    }
    case "SET_PANEL":
      return { ...state, activePanel: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload || "" };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload || "" };
    case "RESET_PULSE":
      return { ...state, cartAddedPulse: false };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const { showToast } = useToast();
  const [state, baseDispatch] = useReducer(reducer, undefined, getInitialState);

  const dispatch = (action) => {
    if (!action || !action.type) {
      return;
    }

    switch (action.type) {
      case "ADD_TO_CART":
        showToast("Added to cart", "success");
        break;
      case "REMOVE_FROM_CART":
        showToast("Removed from cart", "info");
        break;
      case "ADD_TO_WISHLIST":
        showToast("Added to wishlist", "wishlist");
        break;
      case "REMOVE_FROM_WISHLIST":
        showToast("Removed from wishlist", "info");
        break;
      default:
        break;
    }

    baseDispatch(action);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(state.cart));
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(state.wishlist));
  }, [state.cart, state.wishlist]);

  useEffect(() => {
    if (!state.cartAddedPulse) {
      return undefined;
    }
    const timeout = setTimeout(() => {
      dispatch({ type: "RESET_PULSE" });
    }, 350);
    return () => clearTimeout(timeout);
  }, [state.cartAddedPulse]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
