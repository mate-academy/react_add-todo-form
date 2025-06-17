import React from 'react';

type User = {
  name: string;
  email: string;
};

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="UserInfo" data-cy="userInfo">
      <p data-cy="userName">{user.name}</p>
      <a href={`mailto:${user.email}`} data-cy="userEmailLink">
        {user.email}
      </a>
    </div>
  );
};
