import React from 'react';
import { User } from '../../types';

type UsrInfo = {
  user: User
};

export const UserInfo: React.FC<UsrInfo> = ({ user }) => (
  <a
    className="UserInfo"
    href={`mailto:${user.email}`}
  >
    {user.name}
  </a>
);
