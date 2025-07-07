import React from 'react';
import { User } from '../types/types';

interface UInfo {
  user: User;
}

export const UserInfo: React.FC<UInfo> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
