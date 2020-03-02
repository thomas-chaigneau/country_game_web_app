// @flow

import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import Input from '../../../shared/Component/Input/Input';
import SubmitButton from '../../../shared/Component/Button/SubmitButton/SubmitButton';

import useFormModel from '../../../shared/customHooks/formModel';

import {authenticateAction} from '../../../../store/auth/actionCreator';

import Icon from '../../../../assets/icon/index';

import * as formTypes from '../../../../constants/formTypes';

import styles from './AuthenticationPage.module.scss';


type Props = {
    authenticate: Funciton,
    isLoading: boolean,
    isAuthenticate: boolean,
}
const AuthenticationPage = (props: Props) => {
    const {authenticate, isLoading, isAuthenticate} = props;
    const history = useHistory();
    const {emailInput, passwordInput, inputValues, checkForm} = useFormModel();

    useEffect(() => {
        if (history.location.userEmail) {
            emailInput.setValue('email', history.location.userEmail);
        }
    }, [history.location.userEmail]);

    useEffect(() => {
        if (isAuthenticate) {
            history.push({pathname: '/'});
        }
    }, [isAuthenticate, history]);


    const onSubmit = (e) => {
        e.preventDefault();
        const isFormOk = checkForm([
            {field: 'email', type: formTypes.EMAIL},
            {field: 'password', type: formTypes.PASSWORD},
        ]);
        if (isFormOk) {
            const {email, password} = inputValues;
            authenticate({email, password});
        }
    };

    const goToRegister = () => {
        history.push({pathname: '/register'});
    };

    return (
        <div className={styles.root}>
            <div className={styles.header}>
            <h1 className={styles.title}>welcome to geo-fight - Signin</h1>
                <button type="button" className={styles.registerButton} onClick={() => goToRegister()}>
                    <Icon name="registerIcon" className={styles.registerIcon} />
                </button>
            </div>
            <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
                <Input {...emailInput.generate({name: 'email', placeholder: 'E-mail'})} />
                <Input {...passwordInput.generate({name: 'password', placeholder: 'Mot de passe'})} />
                <SubmitButton text="Connection" isLoading={isLoading} disabled={isLoading} />
            </form>
        </div>
    );
};

const mapStateToProps = (state: object) => ({
    isLoading: state.auth.isLoading,
    isAuthenticate: state.auth.isAuthenticate,
});

const mapDispatchToProps = (dispatch: Function) => ({
    authenticate: (userInfo: object) => dispatch(authenticateAction(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationPage);

// AuthenticationPage.whyDidYouRender = true;
