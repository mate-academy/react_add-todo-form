import React from 'react';
import { SelectItemShape } from '../Shapes/SelectItemShape';

export const SelectItem = ({ users }) => (
  <>
    <option value="">
      --- Choose a user ---
    </option>
    {users.map(user => (
      <option key={user.id}>
        {user.name}
      </option>
    ))}
  </>
);

SelectItem.propTypes = SelectItemShape;
