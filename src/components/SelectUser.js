import React from 'react';
import PropTypes from 'prop-types';
import { users } from '../api/users';

export const SelectUser = ({ onChange, selectedUser }) => (
  <select
    name="selectUser"
    value={selectedUser}
    onChange={onChange}
  >
    <option value="Select a user" disabled>
      Select a user
    </option>
    {users.map(user => (
      <option
        value={user.name}
      >
        {user.name}
      </option>
    ))}
  </select>
);

SelectUser.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedUser: PropTypes.string.isRequired,
};

export default SelectUser;
