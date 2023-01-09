import React from 'react';
import { User } from '../../types/user';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo subtitle" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
