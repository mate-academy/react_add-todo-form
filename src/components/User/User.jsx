import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

export const User = ({ name }) => {
  const userName = <span className="name">{name}</span>;

  return userName;
};

User.propTypes = {
  name: PropTypes.string.isRequired,
};
