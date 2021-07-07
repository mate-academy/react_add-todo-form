import React from 'react';

import users from '../../api/users';

export const Users = () => (
  <>
    <option value="">
      Choose a user
    </option>
    {users.map(user => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))}
  </>
);
