import React from 'react';
import propTypes from 'prop-types';

export function NamesList({ users, selectedUser, onChange }) {
  return (
    <select
      value={selectedUser}
      onChange={onChange}
    >
      <option value="default">
        Choose a user
      </option>
      {users.map(user => (
        <option value={user.name}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

NamesList.propTypes = {
  users: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedUser: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
