import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

export const User = ({ name }) => (
  <div className="user">
    {name}
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
