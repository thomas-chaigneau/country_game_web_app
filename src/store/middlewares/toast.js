// @flow

import TOASTS from '../../services/toastService/toastService';
import {popToastAction} from '../toasts/actionsCreator';

const toastMiddleware = (store: object) => (next: Function) => (action: Object) => {
    const toastAction = TOASTS[action.type];
    if (toastAction) {
        store.dispatch(popToastAction(toastAction));
    }
    return next(action);
};

export default toastMiddleware;
