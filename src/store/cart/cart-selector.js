import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (newCart) => newCart.cartItems
);
export const selectCartToggle = createSelector(
  [selectCartReducer],
  (newCart) => newCart.isCartOpen
);

export const selectCartTotal = createSelector(
    [selectCartReducer],
    (newCart) => {
        const {cartItems} = newCart;
        return cartItems.reduce((total, cartItem) => {
            return (total + (cartItem.quantity * cartItem.price));
        }, 0);
    }
)
export const selectCartCount = createSelector(
  [selectCartReducer],
  (newCart) => {
    const { cartItems } = newCart;
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
  }
);
