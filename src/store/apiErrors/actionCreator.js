// @flow

import {CLEAR_ONE_INPUT_ERROR} from './actions';

export const clearApiErrorAction = (fieldName) => (dispatch: Function) => {
    dispatch({type: CLEAR_ONE_INPUT_ERROR, fieldName});
};
