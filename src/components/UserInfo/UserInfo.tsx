import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UI {
  user: User;
}

export const UserInfo: React.FC<UI> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
