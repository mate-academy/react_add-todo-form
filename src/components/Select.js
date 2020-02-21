import React from 'react';
import PropTypes from 'prop-types';

export const Select = ({ userId, users, selectUserId }) => (
  <select value={userId} onChange={selectUserId}>
    <option value={0} disabled>Choose user</option>
    {users.map(user => (
      <option
        key={user.id + 1}
        value={user.id}
      >
        {user.name}
      </option>
    ))}
  </select>
);

Select.propTypes = {
  users: PropTypes.arrayOf.isRequired,
  selectUserId: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
