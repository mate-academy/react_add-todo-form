import React from 'react';
import './User.scss';
import PropTypes from 'prop-types';

export const User = ({ name }) => (
  <strong className="name">{name}</strong>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
