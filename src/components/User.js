import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ users }) => (
  <>
    {
      users.map(user => (
        <option value={user.id} key={user.id}>
          {user.name}
        </option>
      ))
    }
  </>
);

User.propTypes = {
  users: PropTypes.arrayOf(
    {
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    },
  ).isRequired,
}.isRequired;
