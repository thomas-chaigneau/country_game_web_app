// @flow

import React from 'react';
import {connect} from 'react-redux';

import Toast from './Toast/Toast';

import {destroyToastAction} from '../../../store/toasts/actionsCreator';

import styles from './Toasts.module.scss';

type Props = {
    toasts: array<object>,
    destroyToast: Function,
};

const Toasts = (props: Props) => {
    const {toasts, destroyToast} = props;
    return (
        <div className={styles.root}>
            {toasts.map(toast => <Toast key={toast.id} toast={toast} destroyToast={destroyToast} />)}
        </div>
    );
};

const mapStateToProps = (state: object) => ({
    toasts: state.toasts.list,
});

const mapDispatchToProps = (dispatch: Function) => ({
    destroyToast: (id) => dispatch(destroyToastAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);
