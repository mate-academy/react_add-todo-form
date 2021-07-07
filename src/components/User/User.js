import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <h4 className="user__name">
    {user.name}
  </h4>
);

export default User;

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
