import React from 'react';
import { User } from '../types/User';

export const UserInfo: React.FC<User> = ({ name, email }) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
