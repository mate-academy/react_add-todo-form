import React from 'react';

import './Select.css';

const Select = ({ users, selected, onChange }) => (
  <select
    className="users-select form-control"
    value={selected}
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
