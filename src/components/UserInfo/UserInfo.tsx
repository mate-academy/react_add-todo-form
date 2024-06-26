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
      <h3 className="UserInfo__name">{user.name}</h3>
      <a href={`mailto:${user.email}`} className="UserInfo__email">
        {user.email}
      </a>
    </div>
  );
};
