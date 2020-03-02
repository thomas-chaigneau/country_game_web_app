// @flow

import React from 'react';

import ProfilePic from '../ProfilePic/ProfilePic';
// import Chart from '../Chart/Chart';
import ActionButton from '../Button/ActionButton/ActionButton';

import Image from '../../../../assets/image/index';

import styles from './UserCard.module.scss';

type Props = {
    user: object,
    startGame: Function,
};

const UserCard = (props: Props) => {
    const {user, startGame} = props;
    return (
        <div className={styles.root}>
            <Image name="userCover" className={styles.userCover} />
            <div className={styles.mainInfo}>
                <ProfilePic pic={user.profilePic} className={styles.profilePic} />
                <div className={styles.blockText}>
                    <div className={styles.title}>{`${user.firstName} ${user.lastName}`}</div>
                    <div className={styles.subTitle}>{user.location || 'france'}</div>
                </div>
                {/* <div className={styles.blockText}>
                    <div className={styles.title}>Continent favori</div>
                    <div className={styles.subTitle}>{user.favoriteContinent || 'Europe'}</div>
                </div> */}
                <div className={styles.buttonContainer}>
                    <ActionButton text="JOUER" onClick={startGame} />
                </div>
            </div>
            <div className={styles.userStatsContainer}>
                <div className={styles.chartContainer}>
                    <div className={styles.score}>{user.bestScore}</div>
                    <div className={styles.chartTitle}>Meilleur Score</div>
                </div>
                <div className={styles.chartContainer}>
                    <div className={styles.score}>{user.averageScore}</div>
                    <div className={styles.chartTitle}>Score Moyen</div>
                </div>
                <div className={styles.chartContainer}>
                    <div className={styles.score}>{user.worstScore}</div>
                    <div className={styles.chartTitle}>Pire réalisation</div>
                </div>
            </div>

            <div className={styles.userStatsContainer}>
                <div className={styles.rankingContainer}>
                    <div className={styles.star}>
                        <div className={styles.starNb}>{user.nbOfGamesRanking}</div>
                    </div>
                    <div className={styles.number}>{`${user.nbOfGames} parties jouées`}</div>
                    <div className={styles.ranking}>{`clasemment : n° ${user.nbOfGamesRanking}`}</div>
                </div>
                <div className={styles.rankingContainer}>
                    <div className={styles.star}>
                        <div className={styles.starNb}>{user.pointsRanking}</div>
                    </div>
                    <div className={styles.number}>{`${user.points} points`}</div>
                    <div className={styles.ranking}>{`clasemment : n° ${user.pointsRanking}`}</div>
                </div>
                <div className={styles.rankingContainer}>
                    <div className={styles.star}>
                        <div className={styles.starNb}>{user.masteredGamesRanking}</div>
                    </div>
                    <div className={styles.number}>{`${user.masteredGamesNb} parties à 100%`}</div>
                    <div className={styles.ranking}>{`clasemment : n° ${user.masteredGamesRanking}`}</div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
