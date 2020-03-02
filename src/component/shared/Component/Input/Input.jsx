// @flow

import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';

import {clearApiErrorAction} from '../../../../store/apiErrors/actionCreator';

import styles from './Input.module.scss';

type Props = {
    name: String,
    onChange: Function,
    type: String,
    value: Sting,
    error: object,
    clearError: Function,
    apiInputErrors: object,
    clearApiError: Function,
    clearValue: Function,
    loseFocus: Boolean,
    placeholder: String,
};

const Input = (props: Props) => {
    const ref = useRef();
    const {name, onChange, type, value, error, clearError, apiInputErrors, clearApiError, clearValue, loseFocus, placeholder} = props;

    const hasError = error.hasError || apiInputErrors;
    const errorMsg = error.hasError ? error.message : apiInputErrors;
    const hasApiError = Boolean(apiInputErrors);

    // console.log({error});


    useEffect(() => {
        if (apiInputErrors) {
            clearValue();
        }
    }, [apiInputErrors]);

    const clearErrorOnFocus = () => {
        if (error.hasError) {
            clearError(name);
        }
        if (hasApiError) {
            clearApiError(name);
        }
    };

    useEffect(() => {
        if (loseFocus) {
            ref.current.blur();
        }
    }, [loseFocus]);


    return (
        <input
            ref={ref}
            className={!hasError ? styles.root : styles.errorRoot}
            type={type}
            name={name}
            onChange={onChange}
            placeholder={!hasError ? placeholder : errorMsg}
            value={value}
            onFocus={clearErrorOnFocus}
        />
    );
};

const mapStateToProps = (state: object, props) => ({
    apiInputErrors: state.apiErrors.input[props.name],
});

const mapDispatchToProps = (dispatch: Function) => ({
    clearApiError: (fieldName) => dispatch(clearApiErrorAction(fieldName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);
