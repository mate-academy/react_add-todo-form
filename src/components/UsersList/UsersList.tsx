import React from 'react';
import { User } from '../../types/user';

type Props = {
  usersList: User[];
};

export const UsersList: React.FC<Props> = ({ usersList }) => {
  return (
    <>
      {usersList.map(user => (
        <option
          value={user.name}
          key={user.id}
        >
          {user.name}
        </option>
      ))}
    </>
  );
};
