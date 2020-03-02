// @flow

import React, {useEffect} from 'react';

import Icon from '../../../../assets/icon/index';

import * as toastsConstant from '../../../../constants/toastsConstants';

import styles from './Toast.module.scss';

type Props = {
    toast: object,
    destroyToast: Function,
}

const Toast = (props: Props) => {
    const {toast, destroyToast} = props;

    useEffect(() => {
        const id = setTimeout(() => {
            destroyToast(toast.id);
        }, 2500);

        return () => {
            clearTimeout(id);
        };
    }, [toast, destroyToast]);

    const ICONS = {
        [toastsConstant.SUCCESS]: toastsConstant.SUCCESS_ICON,
        [toastsConstant.ERROR]: toastsConstant.ERROR_ICON,
    };

    const icon = ICONS[toast.type];

    return (
        <div className={styles.root}>
            <div className={styles[`type-${toast.type}`]}>
                <Icon className={styles.icon} name={icon} />
                <div className={styles.message}>{toast.message}</div>
            </div>
        </div>
    );
};

export default Toast;
