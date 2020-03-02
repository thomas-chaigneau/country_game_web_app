// @flow
import {combineReducers} from 'redux';

import * as actionTypes from './actions';

type State = {
    list: Array<object>,
    isLoading: boolean,
}

const INITIAL_STATE: State = {
    list: [],
    isLoading: false,
};

const list = (state = INITIAL_STATE.list, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS:
        case actionTypes.GET_USERS_FAILED:
            return INITIAL_STATE.list;
        case actionTypes.GET_USERS_SUCCESS:
            return action.payload;
        case actionTypes.DELETE_USER_SUCCESS:
            return state.filter(user => user._id !== action.payload);
        default:
            return state;
    }
}

const isLoading = (state = INITIAL_STATE.isLoading, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS:
            return true;
        case actionTypes.GET_USERS_FAILED:
        case actionTypes.GET_USERS_SUCCESS:
            return false;
        default:
            return state;
    }
}

const usersReducer = combineReducers({
    list,
    isLoading,
});

export default usersReducer;