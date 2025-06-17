import React from 'react';

type User = {
  name: string;
  email: string;
};

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="UserInfo">
    <a href={`mailto:${user.email}`}>{user.name}</a>
  </div>
);
