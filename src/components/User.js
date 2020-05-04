import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div>
    <p>User: </p>
    <p className="user__name">{user.name}</p>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
