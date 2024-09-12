import React from 'react';
import { User } from '../types';

type UserInfoProps = {
  user: User;
};

export const UserInfo: React.FC<UserInfoProps> = ({
  user: { name, email },
}) => {
  if (!email) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
