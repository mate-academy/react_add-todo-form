import React from 'react';
import { User } from '../../types/User';

interface Props {
  user: User | null;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={user?.email}>
      {user?.name}
    </a>
  );
};
