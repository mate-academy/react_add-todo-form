import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

export const User = ({ name, username, email }) => (
  <div className="user">
    <div className="username">
      &apos;
      {username}
      &apos;
    </div>
    <div className="name">{name}</div>
    <div className="email">{email}</div>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
