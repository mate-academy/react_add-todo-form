import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

export const User = ({ name }) => (
  <div className="userName">{name}</div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
