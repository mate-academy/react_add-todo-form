import React from 'react';
import { SelectShape } from '../../Shapes';

export const Select = ({ options, userNames }) => (
  <select className="input" onChange={options}>
    <option selected="selected">Choose a user</option>
    {userNames.map(user => (
      <option
        key={user.id}
        value={user.id}
      >
        {user.name}
      </option>
    ))}
  </select>
);

Select.propTypes = SelectShape.isRequired;
