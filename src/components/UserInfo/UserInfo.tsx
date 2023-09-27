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
  const { email, name } = user;

  return (
    <a key={key} className="UserInfo" href={email}>
      {name}
    </a>
  );
};
