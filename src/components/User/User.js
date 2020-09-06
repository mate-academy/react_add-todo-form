import React from 'react';
import './User.scss';
import PropTypes from 'prop-types';

export const User = ({ name, id }) => (
  <div>
    <span>{id}</span>
    <p className="user-name">{name}</p>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
