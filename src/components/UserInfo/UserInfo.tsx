import React from 'react';
import { User } from '../../types/User';

export const UserInfo:React.FC<{ user: User }> = ({ user }) => {
  const {
    email,
    name,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
