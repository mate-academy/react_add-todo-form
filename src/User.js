import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <>{user.name}</>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
