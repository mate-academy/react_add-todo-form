import React from 'react';
import { UserProps } from '../../types/User';

interface UserInfoProps {
  user: UserProps;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
