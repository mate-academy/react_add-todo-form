import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ name }) => (
  <th className="userName">{name}</th>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
