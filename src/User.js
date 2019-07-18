import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <tr>
    <th>
      UserName:
      {user.username}
    </th>
    <th>
      Name:
      {user.name}
    </th>
    <th>
      Email:
      {user.email}
    </th>
    <th>
      From:
      {user.address.city}
    </th>
    <th>
      Webiste:
      {user.website}
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
