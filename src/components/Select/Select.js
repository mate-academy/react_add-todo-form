import React from 'react';

import './Select.css';

const Select = ({ users, selectedUser, onChange }) => (
  <select
    className="users-select form-control"
    value={selectedUser}
    onChange={event => onChange(event)}
  >
    <option value={0} />
    {users.map(({ id, name }) => (
      <option
        value={id}
        key={id}
      >
        {name}
      </option>
    ))}
  </select>
);

export default Select;
