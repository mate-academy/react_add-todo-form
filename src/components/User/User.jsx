import React from 'react';
import './User.scss';
import PropTypes from 'prop-types';

export const User = ({ user }) => (
  <span className="name">
    {user.name}
  </span>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
