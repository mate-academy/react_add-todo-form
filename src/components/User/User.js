import React from 'react';
import PropTypes from 'prop-types';

export function User({ name }) {
  return (
    <span>{name}</span>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
};
