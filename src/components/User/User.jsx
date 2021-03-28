import React from 'react';
import PropTypes from 'prop-types';

import './User.css';

export function User({user}) {
  return (
  <span className="user-name"> {user.name}</span>
)};

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
