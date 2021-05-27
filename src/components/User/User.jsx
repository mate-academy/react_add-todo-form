import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

export const User = ({ name }) => (
  <div className="user-name">
    <span className="name-item">
      Name:
    </span>
    {' '}
    {name}
  </div>
);

User.propTypes = {
  name: PropTypes.string,
};

User.defaultProps = {
  name: 'Name is unknown',
};
