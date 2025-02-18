import React from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
