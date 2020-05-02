import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

export const User = ({ userInfo }) => (
  <p className="user">
    {userInfo.name}
  </p>
);

User.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
