// @flow

import React from 'react';

import styles from './SubmitButton.module.scss';

type Props = {
    text: String,
    isLoading: boolean,
    disabled: boolean,
}

const SubmitButton = (props: Props) => {
    const {text, isLoading, disabled} = props;

    return (
        <button
            className={styles.root}
            type="submit"
            disabled={disabled}
        >
            <span className={!isLoading ? styles.text : styles.loading}>{text}</span>
            {isLoading ? <span className={styles.loader} /> : null}
        </button>
    );
};

export default SubmitButton;
