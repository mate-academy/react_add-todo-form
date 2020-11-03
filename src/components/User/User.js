import React from 'react';
import { UserPropTypes } from '../PropTypes/UserPropTypes';

export const User = ({ name }) => (
  <div>
    {name}
  </div>
);

User.propTypes = UserPropTypes;
