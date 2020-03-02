// @flow

import * as actionTypes from './actions';

import {getUsers, deleteUser} from '../../services/apiService/usersRoutes/usersRoutes';


export const getUsersAction = () => (dispatch: Function) => {
    dispatch({type: actionTypes.GET_USERS});
    return getUsers()
    .then(users => dispatch({type: actionTypes.GET_USERS_SUCCESS, payload: users}))
    .catch(err => dispatch({type: actionTypes.GET_USERS_FAILED, payload: err}));
};

export const deleteUserAction = (id: String) => (dispatch: Function) => {
    dispatch({type: actionTypes.DELETE_USER});
    return deleteUser(id)
    .then((deletedUserid) => dispatch({type: actionTypes.DELETE_USER_SUCCESS, payload: deletedUserid}))
    .catch(() => dispatch({type: actionTypes.DELETE_USER_FAILED}));
};
