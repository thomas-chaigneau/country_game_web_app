// @flow
import React from 'react';
import logInIcon from './log-in-icon.png';
import registerIcon from './register-icon.png';
import warningIcon from './warning-icon.png';
import allRigthIcon from './allrigth-icon.png';
import defaultUserPic from './default-user-pic-icon.png';
// defaultUserPic

const ICONS = {
    logInIcon,
    registerIcon,
    warningIcon,
    allRigthIcon,
    defaultUserPic,
};

type Props = {
    name: String,
    className: String,
};

const Icon = ({name, className}: Props) => (
    <img
        src={ICONS[name]}
        alt={`${name}`}
        className={className}
    />
);

export default Icon;
