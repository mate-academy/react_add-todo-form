import React from 'react';
import { UserPropTypes } from '../../PropTypes/UserPropTypes';

export const User = ({ name }) => (
  <span>
    {name}
  </span>
);

User.propTypes = UserPropTypes;
