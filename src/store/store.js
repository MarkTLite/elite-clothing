// import {compose, createStore, applyMiddleware} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";

const middlewares = [process.env.NODE_ENV == "development" && logger].filter(
  Boolean
);

// const composedEnhancers = compose(applyMiddleware(...middlewares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});
