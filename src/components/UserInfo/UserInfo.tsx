import React from 'react';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserInfoProps {
  user: User | undefined;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  const {
    name, username, email,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`} key={username}>
      {name}
    </a>
  );
};
