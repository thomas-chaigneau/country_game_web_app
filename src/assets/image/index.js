// @flow
import React from 'react';

import userCover from './user-cover.jpg';


const IMAGE = {
    userCover,
};

type Props = {
    name: String,
    className: String,
};

const Icon = ({name, className}: Props) => (
    <img
        src={IMAGE[name]}
        alt={`${name}`}
        className={className}
    />
);

export default Icon;
