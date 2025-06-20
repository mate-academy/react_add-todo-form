import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
