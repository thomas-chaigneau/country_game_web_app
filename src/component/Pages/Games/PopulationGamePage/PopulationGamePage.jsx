// @flow

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import SubmitButton from '../../../shared/Component/Button/SubmitButton/SubmitButton';
import Input from '../../../shared/Component/Input/Input';
import NextQuestionModal from '../../../shared/Component/Modal/NextQuestionModal/NextQuestionModal';

import useFormModel from '../../../shared/customHooks/formModel';

import {getQuestionAction, sendAnswerAction, sendPointsAction} from '../../../../store/games/actionCreator';
import {nbWithoutSpaces} from '../../../../utils/utils';

import {POPULATION, MAX_QUESTION_NB} from '../../../../constants/games';
import * as formTypes from '../../../../constants/formTypes';

import styles from './PopulationGamePage.module.scss';

type Props = {
    getQuestion: Function,
    sendAnswer: Function,
    sendPoints: Function,
    isLoading: boolean,
    answer: object,
    country: object<String>,
    userId: String,
};

const PopulationGamePage = (props: Props) => {
    const {getQuestion, sendAnswer, sendPoints, country, answer, isLoading, userId} = props;
    const {number, checkForm, setValue} = useFormModel();
    const history = useHistory();

    const [openModal, setOpenModal] = useState(false);
    const [loseFocus, setLoseFocus] = useState(false);
    const [questionNb, setQuestionNb] = useState(1);
    const [pointsNb, setPointsNb] = useState(0);


    useEffect(() => {
        getQuestion(POPULATION);
    }, [getQuestion]);

    useEffect(() => {
        if (Object.keys(answer).length > 0) {
            setOpenModal(true);
            setPointsNb(pointsNb + answer.points);
        }
    }, [answer]);

    useEffect(() => {
        if (openModal) {
            setLoseFocus(true);
        } else {
            setLoseFocus(false);
        }
    }, [openModal]);

    const onSubmit = (e) => {
        e.preventDefault();
        const isFormOk = checkForm([formTypes.NUMBER]);
        if (isFormOk) {
            sendAnswer(POPULATION, country.name, nbWithoutSpaces(number.value));
        }
    };

    const nextQuestion = () => {
        getQuestion(POPULATION);
        setOpenModal(false);
        setValue(formTypes.NUMBER, '');
        setQuestionNb(questionNb + 1);
    };

    const closeTheGame = () => {
        sendPoints(POPULATION, userId, pointsNb);
        history.push({pathname: '/'});
    };

    if (questionNb <= MAX_QUESTION_NB) {
        return (
            <div className={styles.root}>
                <h1 className={styles.pageTitle}>Estimer la population d'un pays</h1>
                    {isLoading
                    ? <div className={styles.questionContainer}><p>Loading....</p></div>
                    : (
                    <div className={styles.questionContainer}>
                        <div className={styles.questionNb}>{`Question n° ${questionNb}`}</div>
                        <img src={country.flag} alt={`flag-of-${country.name}`} className={styles.flag} />
                        <div className={styles.countryName}>{country.name}</div>
                    </div>
                    )}
                <form onSubmit={(e) => onSubmit(e)} className={styles.answerContainer}>
                    <Input {...number} loseFocus={loseFocus} />
                    <SubmitButton text="repondre" disabled={isLoading || openModal} />
                </form>
                {openModal
                ? <NextQuestionModal
                    className={null}
                    currentAnswer={answer}
                    pointsNb={pointsNb}
                    isOpen={openModal}
                    closeModal={() => setOpenModal(false)}
                    nextQuestion={nextQuestion}
                    closeTheGame={closeTheGame}
                    questionNb={questionNb}
                    setQuestionNb={setQuestionNb}
                    isLastQuestion={questionNb === MAX_QUESTION_NB}
                /> : null}
            </div>
        );
    }
    return (
        <div className={styles.root}>
            <h1 className={styles.pageTitle}>Estimer la population d'un pays</h1>
                <div className={styles.questionContainer}>La partie est terminée</div>
        </div>
    );
};

const mapStateToProps = (state: object) => ({
    country: state.games.country,
    answer: state.games.answer,
    isLoading: state.games.isLoading,
    userId: state.auth.authenticateUser._id,
});

const mapDispatchToProps = (dispatch: Function) => ({
    getQuestion: (gameName: Sting) => dispatch(getQuestionAction(gameName)),
    sendAnswer: (gameName: Sting, country: String, answer: number) => dispatch(sendAnswerAction(gameName, country, answer)),
    sendPoints: (gameName: Sting, userID: String, points: number) => dispatch(sendPointsAction(gameName, userID, points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopulationGamePage);
