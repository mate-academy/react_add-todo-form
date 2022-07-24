import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <a
      className="UserInfo"
      href={`mailto:${user.email}`}
      data-cy="email"
    >
      {`Name: ${user.name}`}
    </a>
  );
};
