import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

function User({ user }) {
  return (
    <div className="user-info">
      <p>{user.name}</p>
      <p>{user.username}</p>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
