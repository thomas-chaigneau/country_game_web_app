// @flow

import React from 'react';
import classNames from 'classnames';

import styles from './ActionButton.module.scss';


type Props = {
    className: String,
    text: String,
    onClick: Function,
}

const ActionButton = (props: Props) => {
    const {className, text, onClick} = props;

    return (
        <button
            className={classNames(styles.root, className)}
            type="button"
            onClick={onClick}
        >
            <span className={styles.text}>{text}</span>
        </button>
    );
};

export default ActionButton;
