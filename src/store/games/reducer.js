// @flow

import {combineReducers} from 'redux';
import * as actionTypes from './actions';

const INITIAL_STATE = {
    question: {},
    isLoading: false,
    answer: {},
};

const question = (state = INITIAL_STATE.question, action) => {
    switch (action.type) {
        case actionTypes.GET_QUESTION:
        case actionTypes.GET_QUESTION_FAILED:
            return INITIAL_STATE.question;
        case actionTypes.GET_QUESTION_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

const isLoading = (state = INITIAL_STATE.isLoading, action) => {
    switch (action.type) {
        case actionTypes.GET_QUESTION:
        case actionTypes.SEND_ANSWER:
            return true;
        case actionTypes.GET_QUESTION_SUCCESS:
        case actionTypes.GET_QUESTION_FAILED:
        case actionTypes.SEND_ANSWER_SUCCESS:
        case actionTypes.SEND_ANSWER_FAILED:
        return INITIAL_STATE.isLoading;
        default:
            return state;
    }
};

const answer = (state = INITIAL_STATE.answer, action) => {
    switch (action.type) {
        case actionTypes.GET_QUESTION:
        case actionTypes.SEND_ANSWER:
        case actionTypes.SEND_ANSWER_FAILED:
        case actionTypes.SEND_POINTS:
            return INITIAL_STATE.answer;
        case actionTypes.SEND_ANSWER_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

const games = combineReducers({
    question,
    answer,
    isLoading,
});

export default games;
