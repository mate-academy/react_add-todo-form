import React from 'react';

type Props = {
  user: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    {user && (
      <>
        <h2 className="list__user-name" data-cy="username">{user.name}</h2>
        <h3
          className="list__mail"
          data-cy="email"
        >
          {user.email}
        </h3>
      </>
    )}
  </>
);
