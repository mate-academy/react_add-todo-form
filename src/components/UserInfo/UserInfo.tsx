import React from 'react';

type Props = {
  users: User | null;
};

export const UserInfo: React.FC<Props> = ({ users }) => (
  <>
    {users && (
      <>
        <h2 data-cy="username">{users.name}</h2>
        <h3 data-cy="email">{users.email}</h3>
      </>
    )}
  </>
);
