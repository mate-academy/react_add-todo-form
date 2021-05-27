import React from 'react';
import PropTypes from 'prop-types';
import './User.scss';

export const User = ({ name }) => (
  <div className="user">
    <p className="user__title">Person name:</p>
    <p className="user__name">{name}</p>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
