// @flow

import * as actionTypes from './actions';

import {authenticate, register} from '../../services/apiService/authRoutes/authRoutes';

export const registerAction = (userInfo: object) => (dispatch: Function) => {
    dispatch({type: actionTypes.REGISTER});
    return register(userInfo)
    .then(user => dispatch({type: actionTypes.REGISTER_SUCCESS, payload: user}))
    .catch(() => dispatch({type: actionTypes.REGISTER_FAILED}));
};

export const authenticateAction = (userInfo: object) => (dispatch: Function) => {
    dispatch({type: actionTypes.AUTHENTICATE});
    return authenticate(userInfo)
    .then(user => dispatch({type: actionTypes.AUTHENTICATE_SUCCESS, payload: user}))
    .catch(() => dispatch({type: actionTypes.AUTHENTICATE_FAILED}));
};
