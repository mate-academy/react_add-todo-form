import React from 'react';
import { User } from '../../types/User';

type Props = {
  users: User[];
};

export const UserInfo: React.FC<Props> = ({ users }) => (
  <>
    {users.map(user => (
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
    ))}
  </>
);
