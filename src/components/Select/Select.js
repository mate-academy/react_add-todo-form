import React from 'react';

import './Select.css';

const Select = (props) => {
  const { users, selectedByDefault, onChange } = props;

  const listToSelect = [...users];

  return (
    <select
      className="users-select form-control"
      value={selectedByDefault}
      onChange={event => onChange(event)}
    >
      <option value={0} />
      {listToSelect.map(({ id, name }) => (
        <option
          value={id}
          key={id}
        >
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
