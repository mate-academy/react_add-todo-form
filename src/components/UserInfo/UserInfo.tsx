import React from 'react';
import { User } from '../../User';

export const UserInfo: React.FC<User> = user => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
