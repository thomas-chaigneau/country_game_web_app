// @flow

import React, {useEffect} from 'react';
// import {useHistory} from 'react-router-dom';

import {connect} from 'react-redux';
import {getUsersAction, deleteUserAction} from '../../../store/users/actionCreator';

type Props = {
    isLoading: boolean,
    getUsers: Function,
    usersList: array<object>,
    deleteUser: Function,
};

const UserListPage = (props: Props) => {
    // const history = useHistory();

    const {
        isLoading,
        getUsers,
        usersList,
        deleteUser,
    } = props;

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isLoading) return <p>isLoading...</p>;
    return (
        <div>
            {usersList.map(user => (
                <div>
                    <span>{user.firstName}</span>
                    <span>{user.lastName}</span>
                    <button type="button" onClick={() => deleteUser(user._id)}>DELETE</button>
                </div>
            ))}
        </div>
    );
};

const mapStateToProps = (state: object) => ({
    isLoading: state.users.isLoading,
    usersList: state.users.list,
});

const mapDispatchToProps = (dispatch: Function) => ({
    getUsers: () => dispatch(getUsersAction()),
    deleteUser: (id) => dispatch(deleteUserAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(UserListPage));
