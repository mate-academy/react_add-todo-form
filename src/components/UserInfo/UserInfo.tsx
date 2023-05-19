import React from 'react';
import { User } from '../../types/User';

interface UserProps {
  user: User | null,
}

export const UserInfo: React.FC<UserProps> = ({ user }) => {
  return (

    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
