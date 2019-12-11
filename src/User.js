import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div>{user.name}</div>
);

User.prototypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default User;
