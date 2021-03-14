import React from 'react';
import PropTypes from 'prop-types';
import './User.scss';

export const User = ({ name }) => (
  <p className="User">
    directed by
    {' '}
    {name}
  </p>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
