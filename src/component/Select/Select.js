import React from 'react';
import { SelectShape } from '../Shape';

export const Select = ({ handleSelect, userName }) => (
  <select onChange={handleSelect}>
    <option selected="selected" disabled>Choose a user</option>
    {userName.map(user => (
      <option
        value={user.id}
      >
        {user.name}
      </option>
    ))}
  </select>
);

Select.propTypes = SelectShape.isRequired;
