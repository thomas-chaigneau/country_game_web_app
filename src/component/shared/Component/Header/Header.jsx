// @flow

import React from 'react';
import {useHistory} from 'react-router-dom';

import Icon from '../../../../assets/icon/index';

import styles from './Header.module.scss';


type Props = {

}

const Header = (props: Props) => {
    const {} = props;
    const history = useHistory();


    const goToRegister = () => {
        history.push({pathname: '/register'});
    };

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>welcome to geo-fight - Signin</h1>
                <button type="button" className={styles.registerButton} onClick={() => goToRegister()}>
                    <Icon name="registerIcon" className={styles.registerIcon} />
                </button>
        </div>
    );
};


export default Header;
