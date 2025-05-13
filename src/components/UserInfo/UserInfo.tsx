import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="UserInfo">
      <p>{user.name}</p>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
};
