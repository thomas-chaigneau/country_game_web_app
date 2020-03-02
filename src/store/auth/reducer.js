// @flow

import {combineReducers} from 'redux';

import * as actionTypes from './actions';
import * as gamesActionTypes from '../games/actions';

type State = {
    isAuthenticate: boolean,
    authenticateUser: object,
    regiteredUser: object,
    isRegistered: boolean,
    isLoading: boolean,
};

const INITIAL_STATE: State = {
    isAuthenticate: false,
    authenticateUser: {},
    isRegistered: false,
    regiteredUser: {},
    isLoading: false,
};

const authenticateUser = (state = INITIAL_STATE.authenticateUser, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
        case actionTypes.CLEAR_SESSION:
        case actionTypes.AUTHENTICATE_FAILED:
            return INITIAL_STATE.authenticateUser;
        case actionTypes.AUTHENTICATE_SUCCESS:
        case gamesActionTypes.SEND_POINTS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

const isAuthenticate = (state = INITIAL_STATE.isAuthenticate, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
        case actionTypes.AUTHENTICATE_FAILED:
        case actionTypes.CLEAR_SESSION:
            return INITIAL_STATE.isAuthenticate;
        case actionTypes.AUTHENTICATE_SUCCESS:
            return true;
        default:
            return state;
    }
};

const regiteredUser = (state = INITIAL_STATE.regiteredUser, action) => {
    switch (action.type) {
        case actionTypes.REGISTER:
        case actionTypes.REGISTER_FAILED:
            return INITIAL_STATE.regiteredUser;
        case actionTypes.REGISTER_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

const isRegistered = (state = INITIAL_STATE.isRegistered, action) => {
    switch (action.type) {
        case actionTypes.REGISTER:
        case actionTypes.REGISTER_FAILED:
            return INITIAL_STATE.isRegistered;
        case actionTypes.REGISTER_SUCCESS:
            return true;
        default:
            return state;
    }
};

const isLoading = (state = INITIAL_STATE.isLoading, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
        case actionTypes.REGISTER:
            return true;
        case actionTypes.AUTHENTICATE_FAILED:
        case actionTypes.AUTHENTICATE_SUCCESS:
        case actionTypes.REGISTER_FAILED:
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.CLEAR_SESSION:
            return INITIAL_STATE.isLoading;
        default:
            return state;
    }
};

const usersReducer = combineReducers({
    authenticateUser,
    isAuthenticate,
    regiteredUser,
    isRegistered,
    isLoading,
});

export default usersReducer;
