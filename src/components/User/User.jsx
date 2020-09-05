import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

export const User = ({ name, id }) => (
  <span className="user">
    {`${name} (id:${id})`}
  </span>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
