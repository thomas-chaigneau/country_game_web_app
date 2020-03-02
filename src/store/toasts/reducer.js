// @flow

import {combineReducers} from 'redux';

import * as actionTypes from './actions';

type State = {
    list: array<object>,
};

const INITIAL_STATE: State = {
    list: [],
};

const list = (state = INITIAL_STATE.list, action) => {
    switch (action.type) {
        case actionTypes.POP_TOAST:
            return [...state, action.payload];
        case actionTypes.DESTROY_TOAST:
            return state.filter(el => el.id !== action.payload);
        default:
            return state;
    }
};


const toastReducer = combineReducers({
    list,
});

export default toastReducer;
