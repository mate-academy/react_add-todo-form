import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

export const User = ({ user }) => (
  <div>
    <span className="user">{user.name}</span>
  </div>
);

const UserType = {
  name: PropTypes.string.isRequired,
};

User.propTypes = {
  user: PropTypes.shape(UserType).isRequired,
};
