import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

export const User = ({ user }) => (
  <div className="user-name">
    <h4>{`${user.name} || ${user.email}`}</h4>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
