import React from 'react';
import PropTypes from 'prop-types';
import './User.scss';

export const User = ({ name }) => (
  <h2 className="user__name">{name}</h2>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
