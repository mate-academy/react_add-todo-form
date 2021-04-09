import React from 'react';
import PropTypes from 'prop-types';
import './User.scss';

export const User = ({ name }) => (
  <div className="user">
    <h3>{name}</h3>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
}
