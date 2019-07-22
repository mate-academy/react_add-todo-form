import React from 'react';
import propTypes from 'prop-types';

const User = ({ user }) => (
  <ul className="todo-item__user">
    <li>
      Name:
      {user.name}
    </li>
    <li>
      Username:
      {user.username}
    </li>
    <li>
      Email:
      {user.email}
    </li>
  </ul>
);

User.propTypes = {
  user: propTypes.shape({
    name: propTypes.string,
    username: propTypes.string,
    email: propTypes.string,
  }).isRequired,
};

export default User;
