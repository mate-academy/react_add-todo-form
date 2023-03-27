import React from 'react';

import './UserInfo.scss';

import { User } from '../../types/User';

interface Props extends User {
  user: User | undefined,
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  // const { name, email } = user;

  const name = user?.name;
  const email = user?.email;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
