import React from 'react';
import './UserInfo.scss';
import { User } from '../../Types/user';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
