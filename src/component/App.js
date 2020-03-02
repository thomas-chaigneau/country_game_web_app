
import React from 'react';
import {Provider} from 'react-redux';
import whyDidYouRender from '@welldone-software/why-did-you-render';


import AuthRouter from './Routers/AuthRouter';
import Toasts from './shared/Toasts/Toasts';

import store from '../store/store';
import ApiClient from '../services/apiService/apiClient';

import styles from './App.module.scss';

const apiClient = new ApiClient(process.env.REACT_APP_API_URL);

apiClient.setUpApiInterceptors(store);


const App = () => {
  whyDidYouRender(React);

  return (
    <div className={styles.root}>
      <Provider store={store}>
        <Toasts />
        <AuthRouter />
      </Provider>
    </div>
  );
};

export default App;
