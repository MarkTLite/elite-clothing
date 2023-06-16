import { createSlice } from "@reduxjs/toolkit";

const CART_INIT_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalPrice: 0,
};

const addCartItem = (cartItems, productToAdd) => {
  // check for existing item. if there, add but with qty increased
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // If cart item exists and number > 1, reduce number,
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id === existingCartItem.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
  // if == 1 remove cartItem
  return cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id);
};

const clearCartItem = (cartItems, cartItemToRemove) => {
  // filter out the item
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INIT_STATE,
  reducers: {
    addItemToCart: (state, action) => {
      const newCartItems = addCartItem(state.cartItems, action.payload);
      state.cartItems = newCartItems;
    },
    removeItemFromCart(state, action) {
      const newCartItems = removeCartItem(state.cartItems, action.payload);
      state.cartItems = newCartItems;
    },
    clearItemFromCart(state, action) {
      const newCartItems = clearCartItem(state.cartItems, action.payload);
      state.cartItems = newCartItems;
    },
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  setIsCartOpen,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;