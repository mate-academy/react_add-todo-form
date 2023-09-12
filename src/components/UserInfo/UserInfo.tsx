import React from 'react';
import { User } from '../../types';
import './UserInfo.scss';

interface Props {
  user: User | null;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return <p> No user found</p>;
  }

  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
