
import PropTypes from 'prop-types';
import React from 'react';

export const User = ({ name }) => (
  <td>{name}</td>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
