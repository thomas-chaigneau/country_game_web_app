// @flow

import React, {useRef, useEffect} from 'react';
import classNames from 'classnames';

import ActionButton from '../Button/ActionButton/ActionButton';

import styles from './Modal.module.scss';

type Props = {
    className: String,
    title: String,
    children: React.Node,
    rightButtonTxt: String,
    rightButtonOnClick: Function,
    leftButtonTxt: String,
    leftButtonOnClick: Function,
    closeModal: Function,
    isOpen: boolean,
    disableClickAway: boolean,
};

const Modal = (props: Props) => {
    const {
        className,
        title,
        children,
        rightButtonTxt,
        rightButtonOnClick,
        leftButtonTxt,
        leftButtonOnClick,
        closeModal,
        isOpen,
        disableClickAway,
    } = props;

    const ref = useRef();

    useEffect(() => { // eslint-disable-line
        if (!disableClickAway) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    });

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            closeModal();
        }
    };

    if (isOpen) {
        return (
            <div ref={ref} className={classNames(styles.root, className)}>
                <div className={styles.title}>{title}</div>
                {children}
                <div className={styles.buttonsContainer}>
                    {leftButtonTxt ? <ActionButton text={leftButtonTxt} onClick={leftButtonOnClick} className={styles.button} /> : null}
                    {rightButtonTxt ? <ActionButton text={rightButtonTxt} onClick={rightButtonOnClick} className={styles.button} /> : null}
                </div>
            </div>
        );
    }
    return null;
};

export default Modal;
