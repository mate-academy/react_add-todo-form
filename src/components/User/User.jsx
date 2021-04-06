import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

export const User = ({user}) => (
  <h2><span>Name:</span> {user.name}</h2>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  })
}
