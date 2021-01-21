import React from 'react';
import { UserType } from '../../types';

import './User.scss';

export const User = ({ name }) => (
  <span className="user-name">
    {` ${name} `}
  </span>
);

User.propTypes = UserType.isRequired;
