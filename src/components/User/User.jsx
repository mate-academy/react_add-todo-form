import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

export const User = ({ name }) => (
  <span className="user">
    {name}
  </span>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
