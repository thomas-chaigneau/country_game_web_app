// @flow

import React from 'react';

import Icon from '../../../../assets/icon/index';

import styles from './ProfilePic.module.scss';

type Props = {
    pic: String,
    className: String,
};

const ProfilePic = (props: Props) => {
    const {pic, className} = props;

    return (
        <div className={className}>
            {pic
            ? <img src={pic} alt="user-profile" className={styles.ProfilePic} />
            : <Icon name="defaultUserPic" className={styles.icon} />}
        </div>
    );
};

export default ProfilePic;
