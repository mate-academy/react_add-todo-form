import React from 'react';

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

type Props = {
  user?: User | null;
};

export const UserInfo: React.FC<Props | null> = ({ user }) => {
  return (
    <h2 data-cy="username">{user?.name}</h2>
  );
};
