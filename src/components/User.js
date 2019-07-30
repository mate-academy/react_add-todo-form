import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <>
      <td>{user.id}</td>
      <td>{user.username}</td>
    </>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default User;
