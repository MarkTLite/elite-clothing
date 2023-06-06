import {compose, createStore, applyMiddleware} from 'redux';
import {logger} from 'react-logger'
import { rootReducer } from './root-reducer';

const middlewares = [process.env.NODE_ENV && logger].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);