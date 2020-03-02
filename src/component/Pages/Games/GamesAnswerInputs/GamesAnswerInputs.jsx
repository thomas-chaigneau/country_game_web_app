// @flow

import React, {useState, useEffect} from 'react';
// import {connect} from 'react-redux';

import SubmitButton from '../../../shared/Component/Button/SubmitButton/SubmitButton';
import Input from '../../../shared/Component/Input/Input';
import Select from '../../../shared/Component/Select/Select';

import useFormModel from '../../../shared/customHooks/formModel';

// import {getQuestionAction, sendAnswerAction} from '../../../../store/games/actionCreator';
import {nbWithoutSpaces} from '../../../../utils/utils';

import * as gameTypes from '../../../../constants/gameTypes';
import * as formTypes from '../../../../constants/formTypes';

import styles from './GamesAnswerInputs.module.scss';

type Props = {
    sendAnswer: Function,
    isLoading: boolean,
    question: object<String>,
    openModal: boolean,
    gameName: String,
    questionNb: number,
    maxQuestionNb: number,
};

const GamesAnswerInputs = (props: Props) => {
    const {gameName, openModal, questionNb, sendAnswer, question, isLoading, maxQuestionNb} = props;

    const {textInput, numberInput, inputValues, checkForm} = useFormModel();

    const [loseFocus, setLoseFocus] = useState(false);

    useEffect(() => {
        if (openModal) {
            setLoseFocus(true);
        } else {
            setLoseFocus(false);
        }
    }, [openModal]);

    const onSubmit = (e) => {
        console.log('onSubmit');
        e.preventDefault();
        let isFormOk = false;
        switch (gameName) {
            case gameTypes.POPULATION:
                isFormOk = checkForm([{field: 'population', type: formTypes.NUMBER}]);
                break;
            case gameTypes.BORDERS:
                isFormOk = true;
                break;
            default:
                break;
        }
        if (isFormOk) {
            sendAnswer(gameName, question.countryName, inputValues);
        }
    };


    const getInputs = () => {
        switch (gameName) {
            case gameTypes.POPULATION:
                return <Input {...numberInput.generate({name: 'population', placeholder: 'Population'})} loseFocus={loseFocus} />;
            case gameTypes.BORDERS:
                return question.requiredAnswerIds.map((requiredAnswerId) => (
                    <Select
                        options={question.options}
                        {...textInput.generate({name: `border-${requiredAnswerId}`, placeholder: `frontière n° ${requiredAnswerId}`})}
                        loseFocus={loseFocus}
                        key={requiredAnswerId}
                    />));
            default:
                return null;
        }
    };

    if (questionNb <= maxQuestionNb) {
        return (
            <div className={styles.root}>
                <form onSubmit={(e) => onSubmit(e)} className={styles.answerContainer}>
                    {getInputs()}
                    <SubmitButton text="repondre" disabled={isLoading || openModal} />
                </form>
            </div>
        );
    }
    return (
        <div className={styles.root}>
            <div className={styles.questionContainer}>La partie est terminée</div>
        </div>
    );
};

export default GamesAnswerInputs;
