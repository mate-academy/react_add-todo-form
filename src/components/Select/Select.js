import React from 'react';
import { SelectShape } from '../../Shapes';

export const Select = ({ options, userName }) => (
  <select className="input" onChange={options}>
    <option selected="selected">Choose a user</option>
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
