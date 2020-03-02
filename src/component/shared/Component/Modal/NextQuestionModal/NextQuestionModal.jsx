// @flow

import React from 'react';
// import classNames from 'classnames';

import Modal from '../Modal';

import {POPULATION, BORDERS} from '../../../../../constants/gameTypes';
import styles from './NextQuestionModal.module.scss';


type ModalContentProps = {
    currentAnswer: object,
    pointsNb: number,
    gameName: String,
};

const ModalContent = ({gameName, currentAnswer, pointsNb}: ModalContentProps) => {
    return (
        <div className={styles.modalContentContainer}>
            <div className={styles.answerStatus}>{currentAnswer.isGoodAnswer ? 'Bonne Réponse !!!' : 'Mauvaise Réponse....'}</div>
            <div className={styles.countryName}>{`Le pays : ${currentAnswer.country}`}</div>
            <GoodAnswer gameName={gameName} currentAnswer={currentAnswer} />
            <div className={styles.questionPoints}>
                {currentAnswer.isGoodAnswer
                ? `Vous avez gagner : ${currentAnswer.points} points !`
                : `Vous avez perdu : ${currentAnswer.points} points...`}
            </div>
            <div className={styles.countryName}>
                {pointsNb >= 0
                ? `Cette partie vous rapporte ${pointsNb} ponts`
                : `Cette partie vous coûte ${pointsNb} ponts`}
            </div>
        </div>
    );
};

type GoodAnswerProps = {
    currentAnswer: object,
    gameName: String,
};

const GoodAnswer = ({gameName, currentAnswer}: GoodAnswerProps) => {
    switch (gameName) {
        case POPULATION:
            return (
                <div className={styles.countryPop}>{`compte exactement ${currentAnswer.goodAnswer.toLocaleString('fr')} habitants`}</div>
            );
        case BORDERS:
            return (
                <div className={styles.countryPop}>
                    <div>est frontalier avec les pays</div>
                    {currentAnswer.goodAnswer.map(border => <div key={border}>{border}</div>)}
                </div>
            );
        default:
            return null;
    }
};

type Props = {
    className: String,
    currentAnswer: boolean,
    closeModal: Function,
    isOpen: boolean,
    nextQuestion: Function,
    questionNb: number,
    isLastQuestion: boolean,
    closeTheGame: Function,
    pointsNb: number,
    gameName: String,
};

const NextQuestionModal = (props: Props) => {
    const {
        className,
        currentAnswer,
        closeModal,
        isOpen,
        nextQuestion,
        closeTheGame,
        questionNb,
        isLastQuestion,
        pointsNb,
        gameName,
    } = props;

    if (!isLastQuestion) {
        return (
            <Modal
                className={className}
                title={`Question n° ${questionNb}`}
                isOpen={isOpen}
                rightButtonTxt="Question Suivante"
                rightButtonOnClick={nextQuestion}
                closeModal={closeModal}
                disableClickAway
            >
            <ModalContent gameName={gameName} currentAnswer={currentAnswer} pointsNb={pointsNb} />
            </Modal>
        );
    }
    return (
        <Modal
            className={className}
            title={`Dernière question n° ${questionNb}`}
            isOpen={isOpen}
            rightButtonTxt="Terminer la Partie"
            rightButtonOnClick={closeTheGame}
            closeModal={closeModal}
            disableClickAway
        >
        <ModalContent gameName={gameName} currentAnswer={currentAnswer} pointsNb={pointsNb} />
        </Modal>
    );
};

export default NextQuestionModal;
