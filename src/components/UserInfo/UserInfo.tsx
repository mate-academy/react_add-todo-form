import React from 'react';
import { User } from '../../types/';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return Object.keys(user).length ? (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  ) : (
    'User information not available'
  );
};
