import React from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type UserInfoProps = {
  key: number;
  user: User;
};

export const UserInfo: React.FC<UserInfoProps> = ({ key, user }) => {
  return (
    <a key={key} className="UserInfo" href={user.email}>
      {user.name}
    </a>
  );
};
