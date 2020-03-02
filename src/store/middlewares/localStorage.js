// @flow

import * as authenticationActions from '../auth/actions';

import ApiClient from '../../services/apiService/apiClient';

const apiClient = new ApiClient(process.env.REACT_APP_API_URL);

const localStorageMiddleware = () => (next: Function) => (action: Object) => {
    switch (action.type) {
        case authenticationActions.AUTHENTICATE_SUCCESS: {
            apiClient.setToken(action.payload.token);
            localStorage.setItem('token', action.payload.token);
            break;
        }
        case authenticationActions.CLEAR_SESSION: {
            localStorage.clear();
            break;
        }
        default:
    }
    return next(action);
};

export default localStorageMiddleware;
