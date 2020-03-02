// @flow

import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {getQuestionAction} from '../../../../store/games/actionCreator';

import {BORDERS} from '../../../../constants/gameTypes';

import styles from './BordersGamePage.module.scss';

type Props = {
    getQuestion: Fuction,
};

const BordersGamePage = (props: Props) => {
    const {getQuestion} = props;

    useEffect(() => {
        getQuestion(BORDERS);
    }, [getQuestion]);

    return (
        <div className={styles.root}>
         BordersGamePage
        </div>
    );
};

const mapStateToProps = (state: object) => ({
    country: state.games.country,
});

const mapDispatchToProps = (dispatch: Function) => ({
    getQuestion: (gameName: Sting) => dispatch(getQuestionAction(gameName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BordersGamePage);
