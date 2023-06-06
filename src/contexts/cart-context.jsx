import { useReducer } from "react";
import { createContext, useEffect, useState } from "react";

export const addCartItem = (cartItems, productToAdd) => {
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

export const removeCartItem = (cartItems, cartItemToRemove) => {
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

export const clearCartItem = (cartItems, cartItemToRemove) => {
    // filter out the item
    return cartItems.filter((cartItem) =>
        cartItem.id !== cartItemToRemove.id
    );
}

const CART_ACTION_TYPES = {
    TOGGLE_IS_CART_OPEN: 'TOGGLE_IS_CART_OPEN',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {...state, ...payload}
        default:
            return new Error(`Unhandled action type - ${type} in code`);
    }
}

//  Context
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    removeItemFromCart: () => { },
    totalPrice: 0,
    clearItemFromCart: () => { },
});

export const CartProvider = ({ children }) => {
    const [{cartCount, totalPrice, cartItems}, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const updateCartItemsDispatcher = (cartItems) => {
        const count = cartItems.reduce((total, cartItem) => {
            return (total + cartItem.quantity);
        }, 0);

        const finalPrice = cartItems.reduce((total, cartItem) => {
            return (total + (cartItem.quantity * cartItem.price));
        }, 0);

        const payload = {
        cartItems,
        cartCount:count,
        totalPrice: finalPrice,
        }

        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: payload});
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsDispatcher(newCartItems);
    }
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsDispatcher(newCartItems);
    }
    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems, cartItemToRemove);
        updateCartItemsDispatcher(newCartItems);
    }
    // maps to context
    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemFromCart,
        totalPrice,
        clearItemFromCart,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}