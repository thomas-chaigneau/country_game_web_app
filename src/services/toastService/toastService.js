/* eslint-disable quotes */
import * as authActions from '../../store/auth/actions';
import * as usersActions from '../../store/users/actions';

import {SUCCESS, ERROR} from '../../constants/toastsConstants';

const authToast = {
    [authActions.REGISTER_SUCCESS]: {
        message: `Votre compte a bien été créé`,
        type: SUCCESS,
    },
    [authActions.AUTHENTICATE_FAILED]: {
        message: `l'Authentification à échouée`,
        type: ERROR,
    },
    [authActions.REGISTER_FAILED]: {
        message: `Votre compte n'a pas pu être créé`,
        type: ERROR,
    },
};

const usersToasts = {
    [usersActions.GET_USERS_FAILED]: {
        message: `Les utilisaturs n'ont pas pu être chargés`,
        type: ERROR,
    },
    [usersActions.DELETE_USER_SUCCESS]: {
        message: `L'utilisateur à bien été supprimé`,
        type: SUCCESS,
    },
    [usersActions.DELETE_USER_FAILED]: {
        message: `L'utilisateur n'a pas pu être supprimé`,
        type: ERROR,
    },
};

const TOASTS = {
    ...authToast,
    ...usersToasts,
};


export default TOASTS;
