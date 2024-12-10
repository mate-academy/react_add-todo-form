import React from 'react';
import { User } from '../../types/user';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const href = `mailto:${user?.email}`;

  return (
    <a className="UserInfo" href={href}>
      {user?.name}
    </a>
  );
};
