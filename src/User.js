import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <tr>
    <th>
      UserName:
      {user.id}
    </th>
    <th>
      Name:
      {user.title}
    </th>
    <th>
      Email:
      {user.completed}
    </th>
  </tr>
);

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
    website: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
