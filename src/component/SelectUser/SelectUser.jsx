import React from 'react';
import PropTypes from 'prop-types';

export const SelectUser = ({
  selectUserHandler,
  selectedUserId,
  users,
}) => (
  <label>
    <select
      name="selectedUserId"
      onChange={selectUserHandler}
      value={selectedUserId}
    >
      <option>Choose a user</option>
      {users.map(user => (
        <option
          key={user.id}
          value={user.id}
        >
          {user.name}
        </option>
      ))}
    </select>
  </label>
);

SelectUser.propTypes = {
  selectUserHandler: PropTypes.func.isRequired,
  selectedUserId: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
