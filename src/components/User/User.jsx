import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

export const User = ({ name }) => (
  <p className="userName">{name}</p>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
