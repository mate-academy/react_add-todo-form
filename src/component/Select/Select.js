import React from 'react';
import { SelectShape } from '../Shape';

export const Select = ({ options, userName }) => (
  <select onChange={options}>
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
