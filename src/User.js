import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <tr>
    <th>
      {user.id}
    </th>
    <th>
      {user.title}
    </th>
    <th>
      {user.completed ? '+' : 'x'}
    </th>
  </tr>
);

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default User;
