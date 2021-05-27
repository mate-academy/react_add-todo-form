import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

export const User = ({ name }) => (
  <p className="user-name">{name}</p>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
