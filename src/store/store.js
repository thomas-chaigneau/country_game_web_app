import { createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import localeStarageMiddleware from './middlewares/localStorage';
import toastMiddleware from './middlewares/toast';

import rootReducer from './rootReducer';

const middlewares = [thunk, localeStarageMiddleware, toastMiddleware];

/* eslint-disable */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middlewares),
        typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    ),
);
/* eslint-enable */

export default store;
