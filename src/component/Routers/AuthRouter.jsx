// @flow
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import {connect} from 'react-redux';

import PagesRouter from './PagesRouter';

import RegisterPage from '../Pages/AuthPage/RegisterPage/RegisterPage';
import AuthenticationPage from '../Pages/AuthPage/AuthenticationPage/AuthenticationPage';

type Props ={
    isAuthenticate: boolean,
}

const AuthRouter = (props: Props) => {
    const {isAuthenticate} = props;

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/register" render={() => isAuthenticate ? <Redirect to="/" /> : <RegisterPage />} />
                <Route path="/login" render={() => isAuthenticate ? <Redirect to="/" /> : <AuthenticationPage />} />
                <Route path="/" render={() => isAuthenticate ? <PagesRouter /> : <Redirect to="/login" />} />
            </Switch>
        </BrowserRouter>
    );
};

const mapStateToProps = (state: object) => ({
    isAuthenticate: state.auth.isAuthenticate,
});

export default connect(mapStateToProps, null)(AuthRouter);
