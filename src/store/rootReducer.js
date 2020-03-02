import {combineReducers} from 'redux';

import users from './users/reducer';
import auth from './auth/reducer';
import toasts from './toasts/reducer';
import games from './games/reducer';
import apiErrors from './apiErrors/reducer';

const appReducer = combineReducers({
    users,
    auth,
    toasts,
    games,
    apiErrors,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
