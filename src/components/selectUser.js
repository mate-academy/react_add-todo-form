import React from 'react';
import PropTypes from 'prop-types';

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
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  handleChange: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};
