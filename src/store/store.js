import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const middlewares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);

// redux dev tools
const composeEnhancerRedux =
  (process.env.NODE_ENV === "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancerRedux(applyMiddleware(...middlewares));


const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"],
};

const persistRootReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistRootReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
