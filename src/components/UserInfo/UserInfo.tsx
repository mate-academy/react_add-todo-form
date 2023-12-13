import React from 'react';
import { User } from '../../types';

export interface PropsUser {
  user: User;
}

export const UserInfo: React.FC<PropsUser> = ({ user }) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
