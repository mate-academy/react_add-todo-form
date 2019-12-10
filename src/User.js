import PropTypes from 'prop-types';
import React from 'react';

function User({ user }) {
  return <td>{user.name}</td>;
}

User.propTypes = { user: PropTypes.objectOf(PropTypes.any).isRequired };

export default User;
