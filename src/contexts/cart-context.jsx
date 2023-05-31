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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const count = cartItems.reduce((total, cartItem) => {
            return (total + cartItem.quantity);
        }, 0);
        setCartCount(count);
    }, [cartItems]);

    useEffect(() => {
        const finalPrice = cartItems.reduce((total, cartItem) => {
            return (total + (cartItem.quantity * cartItem.price));
        }, 0);
        setTotalPrice(finalPrice);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove));
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