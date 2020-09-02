import React from 'react';
import { SelectShape } from '../Shape';

export const Select = ({ handleSelect, users }) => (
  <select onChange={handleSelect}>
    <option selected="selected" disabled>Choose a user</option>
    {users.map(user => (
      <option
        value={user.id}
      >
        {user.name}
      </option>
    ))}
  </select>
);

Select.propTypes = SelectShape.isRequired;
