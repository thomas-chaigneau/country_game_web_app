// @flow

import axios from 'axios';

import {CLEAR_SESSION} from '../../store/auth/actions';
import {INPUT_ERROR} from '../../store/apiErrors/actions';
import {popToastAction} from '../../store/toasts/actionsCreator';

import {ERROR} from '../../constants/toastsConstants';

let instance = null;

class ApiClient {
  constructor(url = null) {
    if (!instance) instance = this;
    this.apiclient = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      timeout: 45000,
    });
    return instance;
  }

  setUpApiInterceptors = (store: Object) => {
    return this.apiclient.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          if (error.response.status === 401) {
            store.dispatch({ type: CLEAR_SESSION });
          }
          if (error.response.data && !error.response.data.global) {
            store.dispatch({ type: INPUT_ERROR, payload: error.response.data});
          }
          if (error.response.data && error.response.data.global) {
            store.dispatch(popToastAction({message: error.response.data.global, type: ERROR}));
          }
        }
        return Promise.reject(error.response);
      },
    );
  };

  setToken = (token: string) => {
    this.apiclient.defaults.headers['access-token'] = token;
  }

  get = url => this.apiclient.get(url);

  post = (url, data) => this.apiclient.post(url, data);

  update = (url, options) => this.apiclient.update(url, options);

  delete = (url, options) => this.apiclient.delete(url, options);
}

export default ApiClient;
