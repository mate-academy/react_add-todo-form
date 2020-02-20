import React from 'react';
import PropTypes from 'prop-types';
import 'bulma';

export const User = ({ user }) => {
  const { name } = user;

  return (
    <td className="td">{name}</td>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
