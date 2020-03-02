// @flow

import React from 'react';
import {useHistory} from 'react-router-dom';

import {connect} from 'react-redux';

import UserCard from '../../shared/Component/UserCard/UserCard';
// import Header from '../../shared/Component/Header/Header';

import styles from './HomePage.module.scss';

type Props = {
    isLoading: boolean,
    user: object,
};

const HomePage = (props: Props) => {
    const {
        isLoading,
        user,
    } = props;

    const history = useHistory();

    const startGame = () => {
        history.push('./games');
    };

    if (isLoading) return <p>isLoading...</p>;
    return (
        <div className={styles.root}>
            <UserCard user={user} startGame={startGame} />
        </div>
    );
};

const mapStateToProps = (state: object) => ({
    isLoading: state.auth.isLoading,
    user: state.auth.authenticateUser,
});

// const mapDispatchToProps = (dispatch: Function) => ({
//     // getUsers: () => dispatch(getUsersAction()),
//     // deleteUser: (id) => dispatch(deleteUserAction(id)),
// });

export default connect(mapStateToProps, null)(React.memo(HomePage));
