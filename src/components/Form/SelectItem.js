import React from 'react';
import { SelectItemShape } from '../../shapes/SelectItemShape';

export const SelectItem = ({ users }) => (
  <>
    <option>
      Choose a user
    </option>
    {users.map(user => (
      <option key={user.id}>
        {user.name}
      </option>
    ))}
  </>
);

SelectItem.propTypes = SelectItemShape;
