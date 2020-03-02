// @flow

import {combineReducers} from 'redux';

import * as actionTypes from './actions';

type State = {
    input: object,
};

const INITIAL_STATE: State = {
    input: {},
    toast: {},
};

const input = (state = INITIAL_STATE.input, action) => {
    const steWithOutError = {...state};
    switch (action.type) {
        case actionTypes.CLEAR_ONE_INPUT_ERROR:
            delete steWithOutError[action.fieldName];
            return steWithOutError;
        case actionTypes.CLEAR_ALL_INPUT_ERROR:
            return INITIAL_STATE.input;
        case actionTypes.INPUT_ERROR:
            return action.payload;
        default:
            return state;
    }
};


const errorReducer = combineReducers({
    input,
});

export default errorReducer;
