import React from 'react';
import { User } from '../../interface/User';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <a
      href={`mailto:${email}`}
      className="UserInfo"
    >
      {name}
    </a>
  );
};
