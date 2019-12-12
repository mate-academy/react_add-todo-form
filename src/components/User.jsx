import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className="todo-list_name">
    {user.name}
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
