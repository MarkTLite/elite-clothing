import { createAction } from "../../utils/reducer/reducer-utils";
import { CART_ACTION_TYPES } from "./cart-types";

const addCartItem = (cartItems, productToAdd) => {
    // check for existing item. if there, add but with qty increased
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // If cart item exists and number > 1, reduce number, 
    const existingCartItem = cartItems.find((cartItem) =>
        cartItem.id === cartItemToRemove.id
    )
    if (existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) =>
            cartItem.id === existingCartItem.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        )
    }
    // if == 1 remove cartItem
    return cartItems.filter((cartItem) =>
        cartItem.id !== existingCartItem.id
    );
}

const clearCartItem = (cartItems, cartItemToRemove) => {
    // filter out the item
    return cartItems.filter((cartItem) =>
        cartItem.id !== cartItemToRemove.id
    );
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
export const removeItemFromCart = (cartItems, productToReomve) => {
    const newCartItems = removeCartItem(cartItems, productToReomve);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
export const clearItemFromCart = (cartItems, productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const setCartItems = (cartItems) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);

export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN, isCartOpen);
