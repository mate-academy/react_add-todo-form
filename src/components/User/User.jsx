import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ user }) => (
  <i>{user}</i>
);

User.propTypes = {
  user: PropTypes.string.isRequired,
};
