import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`} data-cy="userLink">
      {user.name}
    </a>
  );
};
