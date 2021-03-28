import React from 'react';
import './User.scss';
import PropTypes from 'prop-types';
import { UserType } from './Types';

export const User = ({ user }) => (
  <div>
    <span className="user">{user.name}</span>
  </div>
);

User.propTypes = {
  user: PropTypes.shape(UserType).isRequired,
};
