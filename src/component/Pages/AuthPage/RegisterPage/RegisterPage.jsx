// @flow

import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import useFormModel from '../../../shared/customHooks/formModel';
import * as formTypes from '../../../../constants/formTypes';

import Input from '../../../shared/Component/Input/Input';
import SubmitButton from '../../../shared/Component/Button/SubmitButton/SubmitButton';

import {registerAction} from '../../../../store/auth/actionCreator';

import Icon from '../../../../assets/icon/index';

import styles from './RegisterPage.module.scss';

type Props = {
    register: Function,
    regiteredUser: object,
    isRegistered: boolean,
    isLoading: boolean,
};


const RegisterPage = (props: Props) => {
    const {register, regiteredUser, isRegistered, isLoading} = props;
    const history = useHistory();
    const {textInput, emailInput, passwordInput, inputValues, checkForm} = useFormModel();

    useEffect(() => {
        if (isRegistered) {
            history.push({
                pathname: '/login',
                userEmail: regiteredUser.email,
            });
        }
    }, [isRegistered, history, regiteredUser.email]);

    const onSubmit = (e) => {
        e.preventDefault();
        const isFormOk = checkForm([
            {field: 'firstName', type: formTypes.TEXT},
            {field: 'lastName', type: formTypes.TEXT},
            {field: 'email', type: formTypes.EMAIL},
            {field: 'password', type: formTypes.PASSWORD},
        ]);
        if (isFormOk) {
            const {firstName, lastName, email, password} = inputValues;
            register({firstName, lastName, email, password});
        }
    };

    const goToSignIn = () => {
        history.push({pathname: '/login'});
    };

    return (
        <div className={styles.root}>
            <div className={styles.header}>
            <h1 className={styles.title}>welcome to geo-fight - Register</h1>
                <button type="button" className={styles.logInButton} onClick={() => goToSignIn()}>
                    <Icon name="logInIcon" className={styles.logInIcon} />
                </button>

            </div>
            <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
                <Input {...textInput.generate({name: 'firstName', placeholder: 'Prénom'})} />
                <Input {...textInput.generate({name: 'lastName', placeholder: 'Nom'})} />
                <Input {...emailInput.generate({name: 'email', placeholder: 'E-mail'})} />
                <Input {...passwordInput.generate({name: 'password', placeholder: 'Mot de passe'})} />
                <SubmitButton text="Register" isLoading={isLoading} disabled={isLoading} />
            </form>
        </div>
    );
};


const mapStateToProps = (state: object) => ({
    isLoading: state.auth.isLoading,
    isRegistered: state.auth.isRegistered,
    regiteredUser: state.auth.regiteredUser,
});

const mapDispatchToProps = (dispatch: Function) => ({
    register: (userInfo: object) => dispatch(registerAction(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

// RegisterPage.whyDidYouRender = true;
