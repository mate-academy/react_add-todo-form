import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ user }) => (
  <span>{user.name}</span>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
