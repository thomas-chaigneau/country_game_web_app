// @flow

import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';

import {clearApiErrorAction} from '../../../../store/apiErrors/actionCreator';

import styles from './Select.module.scss';

type Props = {
    name: String,
    placeholder: String,
    options: array<object>,
    onChange: Function,
    error: object,
    clearError: Function,
    apiInputErrors: object,
    clearApiError: Function,
    clearValue: Function,
    loseFocus: Boolean,
};

const Select = (props: Props) => {
    const ref = useRef();
    const {name, options, onChange, error, apiInputErrors, placeholder} = props;

    const hasError = error.hasError || apiInputErrors;
    const errorMsg = error.hasError ? error.message : apiInputErrors;

    return (
        <select defaultValue={placeholder} className={styles.root} onChange={onChange}>
            <option disabled hidden>{!hasError ? placeholder : errorMsg}</option>
            {options ? options.map(option => <option key={option.value} value={option.value}>{option.label}</option>) : null}
        </select>
    );
};

const mapStateToProps = (state: object, props) => ({
    apiInputErrors: state.apiErrors.input[props.name],
});

const mapDispatchToProps = (dispatch: Function) => ({
    clearApiError: (fieldName) => dispatch(clearApiErrorAction(fieldName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
