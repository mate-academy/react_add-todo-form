import React from 'react';
import PropTypes from 'prop-types';
// import './User.css';

export const User = ({ name }) => (
  <h2 className="userName">{name}</h2>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
