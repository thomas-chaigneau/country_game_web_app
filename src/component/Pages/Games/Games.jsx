// @flow

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import GamesAnswerInputs from './GamesAnswerInputs/GamesAnswerInputs';
import NextQuestionModal from '../../shared/Component/Modal/NextQuestionModal/NextQuestionModal';

import {getQuestionAction, sendPointsAction, sendAnswerAction} from '../../../store/games/actionCreator';


import styles from './Games.module.scss';

type Props = {
    getQuestion: Fuction,
    sendPoints: Fuction,
    sendAnswer: Fuction,
    gameName: String,
    question: object,
    userId: String,
    isLoading: boolean,
    answer: object,
};

const MAX_QUESTION_NB = 2;

const Games = (props: Props) => {
    const {question, isLoading, gameName, getQuestion, sendAnswer, answer, sendPoints, userId} = props;

    const [openModal, setOpenModal] = useState(false);
    const [questionNb, setQuestionNb] = useState(1);
    const [pointsNb, setPointsNb] = useState(0);

    const history = useHistory();

    useEffect(() => {
        getQuestion(gameName);
    }, [getQuestion, gameName]);

    useEffect(() => {
        if (Object.keys(answer).length > 0) {
            setOpenModal(true);
            setPointsNb(pointsNb + answer.points);
        }
    }, [answer]);

    const nextQuestion = () => {
        getQuestion(gameName);
        setOpenModal(false);
        // setValue(formTypes.NUMBER, '');
        setQuestionNb(questionNb + 1);
    };

    const closeTheGame = () => {
        sendPoints(gameName, userId, pointsNb);
        history.push({pathname: '/'});
    };

    return (
        <div className={styles.root}>
            <h1 className={styles.pageTitle}>{question.questionTitle}</h1>
            {isLoading || !question?.countryName
            ? <div className={styles.questionContainer}><p>Loading....</p></div>
            : (
            <div className={styles.questionContainer}>
                <div className={styles.questionNb}>{`Question n° ${questionNb}`}</div>
                <img src={question.countryFlag} alt={`flag-of-${question.countryName}`} className={styles.flag} />
                <div className={styles.countryName}>{question.countryName}</div>
                <GamesAnswerInputs
                    gameName={gameName}
                    openModal={openModal}
                    questionNb={questionNb}
                    question={question}
                    sendAnswer={sendAnswer}
                    isLoading={isLoading}
                    maxQuestionNb={MAX_QUESTION_NB}
                />
            </div>
            )}
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
                gameName={gameName}
            /> : null}
        </div>
    );
};

const mapStateToProps = (state: object) => ({
    question: state.games.question,
    isLoading: state.games.isLoading,
    answer: state.games.answer,
    userId: state.auth.authenticateUser._id,
});

const mapDispatchToProps = (dispatch: Function) => ({
    getQuestion: (gameName: Sting) => dispatch(getQuestionAction(gameName)),
    sendAnswer: (gameName: Sting, country: String, answer: number) => dispatch(sendAnswerAction(gameName, country, answer)),
    sendPoints: (gameName: Sting, userID: String, points: number) => dispatch(sendPointsAction(gameName, userID, points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);
