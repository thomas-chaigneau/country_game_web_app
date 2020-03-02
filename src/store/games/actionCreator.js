// @flow

import * as actionTypes from './actions';

import {getQuestion, sendAnswer, sendPoints} from '../../services/apiService/gamesRoutes/gamesRoutes';

export const getQuestionAction = (gameName: Sting) => (dispatch: Function) => {
    dispatch({type: actionTypes.GET_QUESTION});
    return getQuestion(gameName)
    .then((res) => dispatch({type: actionTypes.GET_QUESTION_SUCCESS, payload: res}))
    .catch(() => dispatch({type: actionTypes.GET_QUESTION_FAILED}));
};

export const sendAnswerAction = (gameName: Sting, country: String, answer: any) => (dispatch: Function) => {
    console.log('sendAnswerAction', answer);
    dispatch({type: actionTypes.SEND_ANSWER});
    return sendAnswer(gameName, country, answer)
    .then((res) => dispatch({type: actionTypes.SEND_ANSWER_SUCCESS, payload: res}))
    .catch(() => dispatch({type: actionTypes.SEND_ANSWER_FAILED}));
};

export const sendPointsAction = (gameName: Sting, userId: String, points: number) => (dispatch: Function) => {
    dispatch({type: actionTypes.SEND_POINTS});
    return sendPoints(gameName, userId, points)
    .then((res) => dispatch({type: actionTypes.SEND_POINTS_SUCCESS, payload: res}))
    .catch(() => dispatch({type: actionTypes.SEND_POINTS_FAILED}));
};
