// @flow

import {useState, useEffect} from 'react';

import {nbWithSpaces, isGoodEmail, isGoodPassword, isGoodText, isGoodNumber} from '../../../utils/utils';

import store from '../../../store/store';

import * as formTypes from '../../../constants/formTypes';
import {CLEAR_ALL_INPUT_ERROR} from '../../../store/apiErrors/actions';

const useFormModel = () => {
    const [textInput, setTextInput] = useState({email: 'aa@aa.aa'});
    const [emailInput, setEmailInput] = useState({});
    const [passwordInput, setPasswordInput] = useState({password: 'aaaa1111'});
    const [numberInput, setNumberInput] = useState({});

    const [errors, setErrors] = useState({});

    useEffect(() => () => {
        store.dispatch({type: CLEAR_ALL_INPUT_ERROR});
    }, []);

    return {
        textInput: {
            generate: ({name, placeholder}) => ({
                name,
                placeholder,
                type: 'text',
                value: textInput[name] || '',
                error: errors[name] || {hasError: false, message: ''},
                onChange: (e) => setTextInput({...textInput, [name]: e.target.value}),
                clearError: () => setErrors({...errors, [name]: {hasError: false, message: ''}}),
                clearValue: () => setTextInput({...textInput, [name]: ''}),
            }),
            setValue: (fieldName, newValue) => setTextInput({...textInput, [fieldName]: newValue}),
        },
        emailInput: {
            generate: ({name, placeholder}) => ({
                name,
                placeholder,
                type: 'text',
                value: emailInput[name] || '',
                error: errors[name] || {hasError: false, message: ''},
                onChange: (e) => setEmailInput({...emailInput, [name]: e.target.value}),
                clearError: () => setErrors({...errors, [name]: {hasError: false, message: ''}}),
                clearValue: () => setEmailInput({...emailInput, [name]: ''}),
            }),
            setValue: (fieldName, newValue) => setEmailInput({...textInput, [fieldName]: newValue}),
        },
        passwordInput: {
            generate: ({name, placeholder}) => ({
                name,
                placeholder,
                type: 'password',
                value: passwordInput[name] || '',
                error: errors[name] || {hasError: false, message: ''},
                onChange: (e) => setPasswordInput({...passwordInput, [name]: e.target.value}),
                clearError: () => setErrors({...errors, [name]: {hasError: false, message: ''}}),
                clearValue: () => setPasswordInput({...passwordInput, [name]: ''}),
            }),
            setValue: (fieldName, newValue) => setPasswordInput({...textInput, [fieldName]: newValue}),
        },
        numberInput: {
            generate: ({name, placeholder}) => ({
                name,
                placeholder,
                type: 'text',
                value: nbWithSpaces(numberInput[name] || ''),
                error: errors[name] || {hasError: false, message: ''},
                onChange: (e) => setNumberInput({...passwordInput, [name]: e.target.value}),
                clearError: () => setErrors({...errors, [name]: {hasError: false, message: ''}}),
                clearValue: () => setNumberInput({...passwordInput, [name]: ''}),
            }),
            setValue: (fieldName, newValue) => setNumberInput({...textInput, [fieldName]: newValue}),
        },
        inputValues: {...textInput, ...emailInput, ...passwordInput, ...numberInput},
        checkForm: (inputsToCheck) => {
            const form = {...textInput, ...emailInput, ...passwordInput, ...numberInput};
            const errorsTemp = {};
            inputsToCheck.forEach(input => {
                if (!form[input.field] || form[input.field] === '') {
                    errorsTemp[input.field] = {hasError: true, message: 'Champs requis'};
                    return;
                }
                switch (input.type) {
                    case formTypes.TEXT:
                        if (isGoodText(form[input.field])) errorsTemp[input.field] = {hasError: false, message: ''};
                        else {
                            errorsTemp[input.field] = {hasError: true, message: 'Le texte n\'est pas valide'};
                            setTextInput({...textInput, [input.field]: ''});
                        }
                        break;
                    case formTypes.EMAIL:
                        if (isGoodEmail(form[input.field])) {
                            errorsTemp[input.field] = {hasError: false, message: ''};
                        } else {
                            errorsTemp[input.field] = {hasError: true, message: 'L\'email n\'est pas valide'};
                            setEmailInput({...textInput, [input.field]: ''});
                        }
                        break;
                    case formTypes.PASSWORD:
                        if (isGoodPassword(form[input.field])) {
                            errorsTemp[input.field] = {hasError: false, message: ''};
                        } else {
                            errorsTemp[input.field] = {hasError: true, message: 'Le mot de passe est trop faible'};
                            setPasswordInput({...textInput, [input.field]: ''});
                        }
                        break;
                    case formTypes.NUMBER:
                        if (isGoodNumber(form[input.field])) {
                            errorsTemp[input.field] = {hasError: false, message: ''};
                        } else {
                            errorsTemp[input.field] = {hasError: true, message: 'Le nombre n\'est pas au bon format'};
                            setNumberInput({...textInput, [input.field]: ''});
                        }
                        break;
                    default:
                        break;
                }
            });
            setErrors(errorsTemp);
            return Object.values(errorsTemp).filter(value => value.hasError).length === 0;
        },
    };
};

export default useFormModel;
