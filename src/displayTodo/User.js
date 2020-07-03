import React from 'react';
import PropTypes from 'prop-types';

export const User = props => (
  <sub>{props.name}</sub>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
