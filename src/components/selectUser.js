import React from 'react';
import PropTypes from 'prop-types';
import { usersProps } from './propsVars';

export function SelectUser({
  users,
  handleChange,
  userName,
}) {
  return (
    <select
      className="field"
      onChange={handleChange}
      value={userName}
      name="userName"
    >
      <option>
        --choose a User--
      </option>
      {users.map(user => (
        <option key={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

SelectUser.propTypes = {
  users: usersProps.isRequired,
  handleChange: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};
