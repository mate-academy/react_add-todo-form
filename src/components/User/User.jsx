import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

export const User = ({ name }) => (
  <h4 className="user">
    {`User: ${name}`}
  </h4>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
