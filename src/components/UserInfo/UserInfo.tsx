import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    <h2 className="UserInfo__name">{user.name}</h2>
  </a>
);
