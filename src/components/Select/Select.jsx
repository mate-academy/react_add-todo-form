import React from 'react';
import PropTypes from 'prop-types';
import { usersShape } from '../../types';

export const Select = ({ value, action, users }) => (
  <select
    className="form-select"
    aria-label=".form-select-lg example"
    value={value}
    onChange={action}
  >
    <option>{value}</option>
    {users.map(user => (
      <option key={user.id} value={user.name}>{user.name}</option>
    ))}
  </select>
);

Select.propTypes = {
  value: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(usersShape).isRequired,
};
