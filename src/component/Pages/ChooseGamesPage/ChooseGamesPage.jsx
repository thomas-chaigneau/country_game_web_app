// @flow

import React from 'react';
import {useHistory} from 'react-router-dom';

import styles from './ChooseGamesPage.module.scss';

const ChooseGamesPage = () => {
    const history = useHistory();

    return (
        <div className={styles.root}>
            <h1>Chose your game !</h1>
            <div className={styles.gameButtonContainer}>
                <button className={styles.gameButton} type="button" onClick={() => history.push('/games/population')}>Population</button>
                <button className={styles.gameButton} type="button" onClick={() => history.push('/games/borders')}>Borders</button>
            </div>
        </div>
    );
};

export default ChooseGamesPage;
