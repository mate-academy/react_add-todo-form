import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ name }) => (
  <p>
    <span><strong>Name:</strong> {name}</span>
  </p>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
