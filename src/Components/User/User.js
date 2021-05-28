import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = ({ user }) => (
  <div className="user">{user.name}</div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
