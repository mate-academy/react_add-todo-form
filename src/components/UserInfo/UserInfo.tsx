import React from 'react';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    {user && (
      <>
        <p className="subtitle is-5" data-cy="username">
          {user.name}
        </p>
        <a href={`mailto:${user.email}`} data-cy="email" className="has-text-info">{user.email}</a>
      </>
    )}
  </>
);
