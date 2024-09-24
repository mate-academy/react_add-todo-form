import React from 'react';
import { User } from '../../types/User';

interface UserInfoProps {
  user: User | null;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  if (!user) {
    return null;
  }

  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
