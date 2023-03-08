import React from 'react';
import { User } from '../../types/User';

type UsersSelectProps = {
  users: User[]
};

export const UsersSelect:React.FC<UsersSelectProps> = ({
  users,
}) => {
  return (
    <>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </>
  );
};
