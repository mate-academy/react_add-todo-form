import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <>
      <p className="task-title">
        User:
      </p>
      <p className="task-value">{user.name}</p>
    </>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
