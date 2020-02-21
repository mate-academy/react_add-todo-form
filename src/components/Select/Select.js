import React from 'react';
import PropTypes from 'prop-types';
import './Select.css';

export const Select = ({ value, users, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="form__select"
  >
    <option value={0}>Select user</option>
    {users.map(user => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))}
  </select>
);

Select.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
