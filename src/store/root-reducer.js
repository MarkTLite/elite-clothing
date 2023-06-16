import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user-reducer";
import { categoryReducer } from "./categories/categories-reducer";
import { cartReducer } from "./cart/cart-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  cart: cartReducer,
});

// For init