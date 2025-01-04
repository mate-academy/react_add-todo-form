import React from 'react';

type User = {
  id: number;
  name: string;
};

type Props = {
  users: User[];
};

export const UserInfo: React.FC<Props> = ({ users }) => {
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
