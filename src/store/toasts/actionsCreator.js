// @flow

import * as actionTypes from './actions';

const setUniqId = () => {
  const withDate = Math.floor(new Date().valueOf() + Math.random());
  const random = Math.floor(Math.random() * 10000000);
  const randomBis = Math.floor(Math.random() * 10000000);
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const uniqId = randLetter + randomBis + withDate + random;
  return uniqId;
};

export const popToastAction = (toast: object) => (dispatch: Function) => {
    const toastWithId = {...toast, id: setUniqId()};
    dispatch({type: actionTypes.POP_TOAST, payload: toastWithId});
};

export const destroyToastAction = (id) => (dispatch: Function) => {
    dispatch({type: actionTypes.DESTROY_TOAST, payload: id});
};
