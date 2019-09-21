import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <span className="bg-info text-light p-2 mr-2">{user.name}</span>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
