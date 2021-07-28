import React from 'react';
import './User.scss';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className="user">
    {user.name}
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
