import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import users from '../../api/users';

export const Options = () => (
  users.map(user => (
    <option
      key={uuidv4()}
      value={user.name}
    >
      {user.name}
    </option>
  ))
);
