import React from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

type UserProps = {
  user: User,
};

export const UserInfo: React.FC<UserProps> = ({ user }) => {
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
